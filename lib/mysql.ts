import { FFIType } from "bun:ffi";

export const mysqlSymboles = {
  "mysql_server_init": {
    "returns": FFIType.i32,
    "args": [
      FFIType.i32,
      FFIType.cstring,
      FFIType.cstring
    ]
  },
  "mysql_server_end": {
    "returns": FFIType.ptr,
    "args": []
  },
  "mysql_thread_init": {
    "returns": FFIType.bool,
    "args": []
  },
  "mysql_thread_end": {
    "returns": FFIType.ptr,
    "args": []
  },
  "mysql_num_fields": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_eof": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_fetch_field_direct": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.u32
    ]
  },
  "mysql_fetch_fields": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_row_tell": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_field_tell": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_result_metadata": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_field_count": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_errno": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_error": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_sqlstate": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_warning_count": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_info": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_thread_id": {
    "returns": FFIType.u64,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_character_set_name": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_set_character_set": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_init": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_ssl_set": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring
    ]
  },
  "mysql_get_ssl_cipher": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_ssl_session_reused": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_ssl_session_data": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.u32,
      FFIType.ptr
    ]
  },
  "mysql_free_ssl_session_data": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_change_user": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring
    ]
  },
  "mysql_real_connect": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u32,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_select_db": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_query": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_send_query": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_real_query": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_store_result": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_use_result": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_character_set_info": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_session_track_get_first": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.cstring,
      FFIType.ptr
    ]
  },
  "mysql_session_track_get_next": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.cstring,
      FFIType.ptr
    ]
  },
  "mysql_shutdown": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_dump_debug_info": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_refresh": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.u32
    ]
  },
  "mysql_kill": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.u64
    ]
  },
  "mysql_set_server_option": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_ping": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stat": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_server_info": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_client_info": {
    "returns": FFIType.cstring,
    "args": []
  },
  "mysql_get_client_version": {
    "returns": FFIType.u64,
    "args": []
  },
  "mysql_get_host_info": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_server_version": {
    "returns": FFIType.u64,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_get_proto_info": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_list_dbs": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_list_tables": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_list_processes": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_options": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_options4": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_get_option": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_free_result": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_data_seek": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_row_seek": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_field_seek": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_fetch_row": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_fetch_lengths": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_fetch_field": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_list_fields": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring
    ]
  },
  "mysql_escape_string": {
    "returns": FFIType.u64,
    "args": [
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_hex_string": {
    "returns": FFIType.u64,
    "args": [
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_real_escape_string": {
    "returns": FFIType.u64,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_real_escape_string_quote": {
    "returns": FFIType.u64,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u64,
      FFIType.char
    ]
  },
  "mysql_debug": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.cstring
    ]
  },
  "mysql_thread_safe": {
    "returns": FFIType.u32,
    "args": []
  },
  "mysql_read_query_result": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_reset_connection": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_bind_param": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.cstring
    ]
  },
  "mysql_stmt_init": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_prepare": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_stmt_execute": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_fetch": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_fetch_column": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u64
    ]
  },
  "mysql_stmt_store_result": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_param_count": {
    "returns": FFIType.u64,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_attr_set": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_attr_get": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_bind_param": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_bind_result": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_close": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_reset": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_free_result": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_send_long_data": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.u32,
      FFIType.cstring,
      FFIType.u64
    ]
  },
  "mysql_stmt_result_metadata": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_param_metadata": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_errno": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_error": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_sqlstate": {
    "returns": FFIType.cstring,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_row_seek": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_row_tell": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_data_seek": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.ptr
    ]
  },
  "mysql_stmt_field_count": {
    "returns": FFIType.u32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_commit": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_rollback": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_autocommit": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr,
      FFIType.bool
    ]
  },
  "mysql_more_results": {
    "returns": FFIType.bool,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_next_result": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_stmt_next_result": {
    "returns": FFIType.i32,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_close": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr
    ]
  },
  "mysql_reset_server_public_key": {
    "returns": FFIType.ptr,
    "args": []
  },
  "mysql_real_connect_dns_srv": {
    "returns": FFIType.ptr,
    "args": [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.cstring,
      FFIType.u64
    ]
  }
}
