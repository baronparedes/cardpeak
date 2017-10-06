﻿export const AGENT_ACTIONS = {
    SELECT_AGENT: "SELECT_AGENT",
    SELECT_AGENT_DASHBOARD: "SELECT_AGENT_DASHBOARD",
    SELECT_AGENT_DASHBOARD_COMPLETE: "SELECT_AGENT_DASHBOARD_COMPLETE",
    GET_ALL: "GET_ALL",
    GET_ALL_COMPLETE: "GET_ALL_COMPLETE",
    POST_AGENT_TRANSACTION: "POST_AGENT_TRANSACTION",
    POST_AGENT_TRANSACTION_COMPLETE: "POST_AGENT_TRANSACTION_COMPLETE",
    POST_AGENT_TRANSACTION_ERROR: "POST_AGENT_TRANSACTION_ERROR",
    REFRESH_AGENT_DASHBOARD: "REFRESH_AGENT_DASHBOARD",
    REFRESH_AGENT_DASHBOARD_COMPLETE: "REFRESH_AGENT_DASHBOARD_COMPLETE",
    PUT_AGENT: "PUT_AGENT",
    PUT_AGENT_COMPLETE: "PUT_AGENT_COMPLETE",
    PUT_AGENT_ERROR: "PUT_AGENT_ERROR",
    POST_AGENT: "POST_AGENT",
    POST_AGENT_COMPLETE: "POST_AGENT_COMPLETE",
    POST_AGENT_ERROR: "POST_AGENT_ERROR",
    GET_ACCOUNTS: "GET_ACCOUNTS"
}

export const RATE_ACTIONS = {
    SELECT_AGENT_RATE: "SELECT_AGENT_RATE",
    SELECT_AGENT_RATE_COMPLETE: "SELECT_AGENT_RATE_COMPLETE",
    POST_RATES: "POST_RATES",
    POST_RATES_COMPLETE: "POST_RATES_COMPLETE",
    POST_RATES_ERROR: "POST_RATES_ERROR",
    DELETE_RATE: "DELETE_RATE",
    ADD_RATE: "ADD_RATE"
}

export const SETTINGS_ACTIONS = {
    LOAD_REFERENCES: "LOAD_REFERENCES",
    LOAD_REFERENCES_COMPLETE: "LOAD_REFERENCES_COMPLETE",
    LOAD_REFERENCES_ERROR: "LOAD_REFERENCE_ERROR",
    POST_REFERENCE: "POST_REFERENCE",
    POST_REFERENCE_COMPLETE: "POST_REFERENCE_COMPLETE",
    POST_REFERENCE_ERROR: "POST_REFERENCE_ERROR"
}

export const UPLOAD_ACTIONS = {
    UPLOAD_FILE: "UPLOAD_FILE",
    UPLOAD_FILE_COMPLETE: "UPLOAD_FILE_COMPLETE",
    UPLOAD_FILE_ERROR: "UPLOAD_FILE_ERROR",
    PROCESS_BATCH: "PROCESS_BATCH",
    PROCESS_BATCH_COMPLETE: "PROCESS_BATCH_COMPLETE",
    PROCESS_BATCH_ERROR: "PROCESS_BATCH_ERROR",
    CLEAR_BATCH: "CLEAR_BATCH",
    GET_BATCH_FILE_CONFIG: "GET_BATCH_FILE_CONFIG",
    GET_BATCH_FILE_CONFIG_COMPLETED: "GET_BATCH_FILE_CONFIG_COMPLETED",
    GET_BATCH_FILE_CONFIG_ERROR: "GET_BATCH_FILE_CONFIG_ERROR",
    CLEAR_BATCH_FILE_CONFIG: "CLEAR_BATCH_FILE_CONFIG",
    POST_BATCH_FILE_CONFIG: "POST_BATCH_FILE_CONFIG",
    POST_BATCH_FILE_CONFIG_COMPLETE: "POST_BATCH_FILE_CONFIG_COMPLETE",
    POST_BATCH_FILE_CONFIG_ERROR: "POST_BATCH_FILE_CONFIG_ERROR",
    MANAGE_UPLOADS: "MANAGE_UPLOADS",
    MANAGE_UPLOADS_COMPLETE: "MANAGE_UPLOADS_COMPLETE",
    MANAGE_UPLOADS_ERROR: "MANAGE_UPLOADS_ERROR",
    DELETE_BATCH: "DELETE_BATCH",
    DELETE_BATCH_COMPLETE: "DELETE_BATCH_COMPLETE",
    DELETE_BATCH_ERROR: "DELETE_BATCH_ERROR"
}

export const TRANSACTION_ACTIONS = {
    GET_TRANSACTION: "GET_TRANSACTION",
    GET_TRANSACTION_COMPLETE: "GET_TRANSACTION_COMPLETE",
    GET_TRANSACTION_ERROR: "GET_TRANSACTION_ERROR"
}

export const DASHBOARD_ACTIONS = {
    GET_DASHBOARD: "GET_DASHBOARD",
    GET_DASHBOARD_COMPLETE: "GET_DASHBOARD_COMPLETE",
    REFRESH_PROCESSED_BATCH: "REFRESH_PROCESSED_BATCH"
}

export const METRIC_ACTIONS = {
    GET_YEARS: "GET_YEARS",
    GET_METRICS: "GET_METRICS",
    GET_METRICS_ERROR: "GET_METRICS_ERROR",
    GET_AGENT_METRICS_COMPLETE: "GET_AGENT_METRICS_COMPLETE",
    GET_AGENT_RANKING_METRICS_COMPLETE: "GET_AGENT_RANKING_METRICS_COMPLETE",
    GET_AGENT_PERFORMANCE_METRICS_COMPLETE: "GET_AGENT_PERFORMANCE_METRICS_COMPLETE",
}

export const AGENT_PAYOUT_ACTIONS = {
    INIT: "INIT",
    GET_AGENT_PAYOUT: "GET_AGENT_PAYOUT",
    GET_AGENT_PAYOUT_COMPLETE: "GET_AGENT_PAYOUT_COMPLETE",
    GET_AGENT_PAYOUT_ERROR: "GET_AGENT_PAYOUT_ERROR"
}