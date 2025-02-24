// const url = "http://192.168.1.86/";
// const url = "http://192.168.1.93:8000/";
const url = "http://127.0.0.1:8000/";
const role = {
  admin: "admin",
  student: "student",
  lecturer: "lecturer",
};

export const RoutesApi = {
  url: url,
  login: url + "api/login",
  tasksAdmin: url + `api/${role.admin}/tasks`,
  contractAdmin: url + `api/${role.admin}/contract`,
  uniAdmin: url + `api/${role.admin}/universities`,
  classAdmin: url + `api/${role.lecturer}/groups`,
  // taskAdmin: url + `api/${role.admin}/tasks`,
  classLecturer: {
    url: url + `api/${role.lecturer}/groups`,
    intent: "api.user.create.group",
  },
  classGroup: {
    url: url + `api/${role.lecturer}/groups`,
    intent: "api.get.group.with.assignments",
  },
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
