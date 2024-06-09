
	CREATE OR REPLACE PROCEDURE insert_session(p_user_id INT)
	LANGUAGE plpgsql
	AS $$
	BEGIN
		INSERT INTO sessions (user_id, session_key)
		VALUES (p_user_id, gen_random_uuid()::varchar);
	END;
	$$;

	CREATE OR REPLACE FUNCTION trigger_insert_session()
	RETURNS TRIGGER
	LANGUAGE plpgsql
	AS $$
	BEGIN
		CALL insert_session(NEW.user_id);
		RETURN NEW;
	END;
	$$;

	CREATE OR REPLACE TRIGGER after_user_insert
	AFTER INSERT ON users
	FOR EACH ROW
	EXECUTE FUNCTION trigger_insert_session();
