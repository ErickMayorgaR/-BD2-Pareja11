# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#231212 20:28:50 server id 1  end_log_pos 126 CRC32 0x9811da6d 	Start: binlog v 4, server v 8.0.34 created 231212 20:28:50
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
4hZ5ZQ8BAAAAegAAAH4AAAABAAQAOC4wLjM0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAW3aEZg=
'/*!*/;
# at 126
#231212 20:28:50 server id 1  end_log_pos 157 CRC32 0x37e542a8 	Previous-GTIDs
# [empty]
# at 157
#231212 20:28:58 server id 1  end_log_pos 236 CRC32 0x02a2c53f 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1702434538676308	immediate_commit_timestamp=1702434538676308	transaction_length=737
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1702434538676308 (2023-12-12 20:28:58.676308 Central America Standard Time)
# immediate_commit_timestamp=1702434538676308 (2023-12-12 20:28:58.676308 Central America Standard Time)
/*!80001 SET @@session.original_commit_timestamp=1702434538676308*//*!*/;
/*!80014 SET @@session.original_server_version=80034*//*!*/;
/*!80014 SET @@session.immediate_server_version=80034*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 236
#231212 20:28:58 server id 1  end_log_pos 327 CRC32 0x5ff2adce 	Query	thread_id=25	exec_time=0	error_code=0
SET TIMESTAMP=1702434538/*!*/;
SET @@session.pseudo_thread_id=25/*!*/;
SET @@session.foreign_key_checks=0, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 327
#231212 20:28:58 server id 1  end_log_pos 405 CRC32 0xd541e65b 	Table_map: `practica1_pareja11`.`habitacion` mapped to number 199
# has_generated_invisible_primary_key=0
# at 405
#231212 20:28:58 server id 1  end_log_pos 863 CRC32 0xa40f538f 	Write_rows: table id 199 flags: STMT_END_F

BINLOG '
6hZ5ZRMBAAAATgAAAJUBAAAAAMcAAAAAAAMAEnByYWN0aWNhMV9wYXJlamExMQAKaGFiaXRhY2lv
bgACAw8CyAAAAQEAAgP8/wBb5kHV
6hZ5ZR4BAAAAygEAAF8DAAAAAMcAAAAAAAMAAgAC/wABAAAAE1NhbGEgZGUgZXhhbWVuZXMgMQ0A
AgAAABNTYWxhIGRlIGV4YW1lbmVzIDINAAMAAAATU2FsYSBkZSBleGFtZW5lcyAzDQAEAAAAE1Nh
bGEgZGUgZXhhbWVuZXMgNA0ABQAAABNTYWxhIGRlIGltYWdlbmVzIDENAAYAAAAZU2FsYSBkZSBw
cm9jZWRpbWllbnRvcyAxDQAHAAAAGVNhbGEgZGUgcHJvY2VkaW1pZW50b3MgMg0ACAAAABlTYWxh
IGRlIHByb2NlZGltaWVudG9zIDMNAAkAAAAZU2FsYSBkZSBwcm9jZWRpbWllbnRvcyA0DQAKAAAA
ClJlY2VwY2lvbg0ACwAAAAxMYWJvcmF0b3Jpbw0ADAAAAB1Fc3RhY2nDg8KzbiBkZSByZXZpc2nD
g8KzbiAxDQANAAAAHUVzdGFjacODwrNuIGRlIHJldmlzacODwrNuIDINAA4AAAAdRXN0YWNpw4PC
s24gZGUgcmV2aXNpw4PCs24gMw0ADwAAAB1Fc3RhY2nDg8KzbiBkZSByZXZpc2nDg8KzbiA0DY9T
D6Q=
'/*!*/;
# at 863
#231212 20:28:58 server id 1  end_log_pos 894 CRC32 0x3dbdd6ef 	Xid = 4809
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
