import { IntentEnum } from "./enums/IntentEnum";

// const url = "http://192.168.1.86/";
// const url = "http://192.168.1.93:8000/";
// const url = "http://127.0.0.1:8000/";
// const apiUrl = "http://127.0.0.1:8000/api/";

const url = "https://api.coretaxify.com/";
const apiUrl = "https://api.coretaxify.com/api/";
// const url = "http://127.0.0.1:8000/";
// const apiUrl = "http://127.0.0.1:8000/api/";
const role = {
    admin: "admin",
    student: "student",
    lecturer: "lecturer",
    psc: "psc",
    student_psc: "student-psc",
    instructor: "instructor",
};

const apiResource = (baseUrl, resourceName) => {
    const base = baseUrl && !baseUrl.endsWith("/") ? `${baseUrl}/` : baseUrl;
    const resourceUrl = `${base}${resourceName}`;

    return {
        // Resource info
        name: resourceName,
        url: resourceUrl,

        // Basic Endpoints
        index: () => ({ url: resourceUrl, method: "GET" }), // get index
        show: (id) => ({ url: `${resourceUrl}/${id}`, method: "GET" }), // show
        store: () => ({ url: resourceUrl, method: "POST" }), // store (create)
        update: (id) => ({ url: `${resourceUrl}/${id}`, method: "PUT" }), // update
        destroy: (id) => ({ url: `${resourceUrl}/${id}`, method: "DELETE" }), // delete

        // intent
        withIntent: (action, intentValue) => ({
            url: resourceUrl,
            intent: { intent: intentValue },
        }),

        showWithIntent: (id, intentValue) => ({
            url: `${resourceUrl}/${id}`,
            intent: { intent: intentValue },
        }),

        // nested
        nested: function(id, nestedResourceName) {
            return apiResource(`${resourceUrl}/${id}`, nestedResourceName);
        },

        // custo endpoint
        custom: function(actionName) {
            return `${resourceUrl}/${actionName}`;
        },

        customWithId: function(id, actionName) {
            return `${resourceUrl}/${id}/${actionName}`;
        },
    };
};

export const RoutesApi = {
    // base url
    apiUrl: apiUrl,

    // auth non-login
    csrf: apiUrl + "csrf-token",
    register: apiUrl + "register", // req name, email, password, password_confirmation, contract_code (class_code for psc)
    login: apiUrl + "login", // req email, password
    reset_password: apiUrl + "reset-password", // req email

    // auth after-login
    logout: apiUrl + "logout", // req token
    profile: apiUrl + "profile", // req token
    profile_update: apiUrl + "profile/update", // req name, email, password, password_confirmation, image
    verify_otp: apiUrl + "verify-otp", // req email, otp
    resend_otp: apiUrl + "resend-otp", // req email
    verification_status: apiUrl + "verification-status", // req token

    // get tasks : lecturer
    getTasksLecturer: apiUrl + `${role.lecturer}/contract-tasks`,

    // api that use resource
    // admin
    admin: {
        users: apiResource(apiUrl + `${role.admin}`, "users"),
        assignments: apiResource(apiUrl + `${role.admin}`, "assignments"),
        accounts: apiResource(apiUrl + `${role.admin}`, "accounts"),
        groups: apiResource(apiUrl + `${role.admin}`, "groups"),
        roles: apiResource(apiUrl + `${role.admin}`, "roles"),
        tasks: apiResource(apiUrl + `${role.admin}`, "tasks"),
        universities: apiResource(apiUrl + `${role.admin}`, "universities"),
        contract: apiResource(apiUrl + `${role.admin}`, "contract"),
        accountTypes: apiResource(apiUrl + `${role.admin}`, "account-types"),
    },

    // lecturer
    lecturer: {
        groups: apiResource(apiUrl + `${role.lecturer}`, "groups"),
        assignments: apiResource(apiUrl + `${role.lecturer}`, "assignments"),
        exams: apiResource(apiUrl + `${role.lecturer}`, "exams"),
    },

    student: {
        groups: apiResource(apiUrl + `${role.student}`, "groups"),
        assignments: apiResource(apiUrl + `${role.student}`, "assignments"),
        exams: apiResource(apiUrl + `${role.student}`, "exams"),
        sistems: apiResource(apiUrl + `${role.student}`, "sistems"),
        portal_saya: apiResource(apiUrl + `${role.student}`, "portal-saya"),
        profil_saya: apiResource(apiUrl + `${role.student}`, "profil-saya"),
        informasi_umum: apiResource(apiUrl + `${role.student}`, "informasi-umum"),
        detail_kontak: apiResource(apiUrl + `${role.student}`, "detail-kontak"),
        detail_bank: apiResource(apiUrl + `${role.student}`, "detail-bank"),
        jenis_pajak: apiResource(apiUrl + `${role.student}`, "jenis-pajak"),
        kode_klu: apiResource(apiUrl + `${role.student}`, "kode-klu"),
        pihak_terkait: apiResource(apiUrl + `${role.student}`, "pihak-terkait"),
        data_ekonomi: apiResource(apiUrl + `${role.student}`, "data-ekonomi"),
        objek_pajak_bumi_dan_bangunan: apiResource(
            apiUrl + `${role.student}`,
            "objek-pajak-bumi-dan-bangunan"
        ),
        nomor_identifikasi_eksternal: apiResource(
            apiUrl + `${role.student}`,
            "nomor-identifikasi-eksternal"
        ),
        penunjukkan_wajib_pajak_saya: apiResource(
            apiUrl + `${role.student}`,
            "penunjukkan-wajib-pajak-saya"
        ),
        manajemen_kasuses: apiResource(
            apiUrl + `${role.student}`,
            "manajemen-kasuses"
        ),
        alamat_wajib_pajak: apiResource(
            apiUrl + `${role.student}`,
            "alamat-wajib-pajak"
        ),
    },

    psc: {
        groups: apiResource(apiUrl + `${role.psc}`, "groups"),
        users: apiResource(apiUrl + `${role.psc}`, "users"),
        assignments: apiResource(apiUrl + `${role.psc}`, "assignments"),
        exams: apiResource(apiUrl + `${role.psc}`, "exams"),
        tasks: apiResource(apiUrl + `${role.psc}`, "tasks"),
    },

    student_psc: {
        groups: apiResource(apiUrl + `${role.student_psc}`, "groups"),
        assignments: apiResource(apiUrl + `${role.student_psc}`, "assignments"),
        exams: apiResource(apiUrl + `${role.student_psc}`, "exams"),
        sistems: apiResource(apiUrl + `${role.student_psc}`, "sistems"),
    },

    instructor: {
        tasks: apiResource(apiUrl + `${role.instructor}`, "tasks"),
        assignments: apiResource(apiUrl + `${role.instructor}`, "assignments"),
    },

    // Helper nested
    getGroupAssignmentMembers: (groupId, assignmentId) =>
        RoutesApi.lecturer.groups
        .nested(groupId, "assignments")
        .nested(assignmentId, "members")
        .index(),

    getGroupAssignmentMembers: (groupId, assignmentId) =>
        RoutesApi.lecturer.groups
        .nested(groupId, "assignments")
        .nested(assignmentId, "members")
        .show(memberId),

    // LEGACY URL

    url: url,
    login: url + "api/login",
    tasksAdmin: url + `api/${role.admin}/tasks`,
    tasksContract: url + `api/${role.lecturer}/contract-tasks`,
    contractAdmin: url + `api/${role.admin}/contract`,
    uniAdmin: url + `api/${role.admin}/universities`,
    classAdmin: url + `api/${role.lecturer}/groups`,
    getUserAdmin: {
        url: url + `api/${role.admin}/users`,
        intent: {
            psc: "api.user.get.psc",
            admin: "api.user.get.admin",
            dosen: "api.user.get.dosen",
            mahasiswa: "api.user.get.mahasiswa",
            mahasiswapsc: "api.user.get.mahasiswa-psc",
            instruktur: "api.user.get.instruktur",
        },
    },
    // taskAdmin: url + `api/${role.admin}/tasks`,
    classLecturer: {
        url: url + `api/${role.lecturer}/groups`,
        intent: "api.user.create.group",
    },
    classGroup: {
        url: url + `api/${role.lecturer}/groups`,
        intent: "api.get.group.with.assignments",
    },
    // classGroupPraktikumMember:{
    //   url: url + `api/${role.lecturer}/groups`,
    // },
    // classStudent:
    getAdmin: {
        url: url + `api/${role.admin}/users`,
        intent: "api.user.get.admin",
    },
    postAdmin: {
        url: url + `api/${role.admin}/users`,
        intent: "api.user.create.admin",
    },
    getDosenAdmin: {
        url: url + `api/${role.admin}/users`,
        intent: "api.user.get.dosen",
    },
    importDosenAdmin: {
        url: url + `api/${role.admin}/users`,
        intent: "api.user.import.dosen",
    },
    joinClass: {
        url: url + `api/${role.student}/groups`,
        intent: "api.user.join.group",
    },
    assignment: {
        url: url + `api/${role.lecturer}/assignments`,
        intent: "api.user.create.assignment",
    },
    assignmentStudent: {
        url: url + `api/${role.student}/assignments`,
        intent: "api.user.assign.task",
    },
    register: url + "api/register",
    verify_otp: url + "api/verify-otp",
};