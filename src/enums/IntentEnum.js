export const IntentEnum = {
    // User Creation
    API_USER_CREATE_ADMIN: 'api.user.create.admin',
    API_USER_CREATE_PSC: 'api.user.create.psc',
    API_USER_CREATE_MAHASISWA_PSC: 'api.user.create.mahasiswa.psc',
    API_USER_CREATE_INSTRUKTUR: 'api.user.create.instruktur',
    
    // User Retrieval
    API_USER_GET_PSC: 'api.user.get.psc',
    API_USER_GET_ADMIN: 'api.user.get.admin',
    API_USER_GET_DOSEN: 'api.user.get.dosen',
    API_USER_GET_MAHASISWA: 'api.user.get.mahasiswa',
    API_USER_GET_MAHASISWA_PSC: 'api.user.get.mahasiswa.psc',
    API_USER_GET_INSTRUKTUR: 'api.user.get.instruktur',
    
    // User Import
    API_USER_IMPORT_DOSEN: 'api.user.import.dosen',
    API_USER_IMPORT_MAHASISWA_PSC: 'api.user.import.mahasiswa.psc',
    API_USER_IMPORT_INSTRUKTUR: 'api.user.import.instruktur',
    
    // Group Management
    API_USER_CREATE_GROUP: 'api.user.create.group',
    API_USER_JOIN_GROUP: 'api.user.join.group',
    
    // Assignment Management
    API_USER_CREATE_ASSIGNMENT: 'api.user.create.assignment',
    API_USER_JOIN_ASSIGNMENT: 'api.user.join.assignment',
    
    // Exam Management
    API_USER_CREATE_EXAM: 'api.user.create.exam',
    API_USER_JOIN_EXAM: 'api.user.join.exam',
    
    // Data Retrieval
    API_GET_GROUP_ALL: 'api.get.group.all',
    API_GET_ASSIGNMENT_ALL: 'api.get.assignment.all',
    API_GET_SELF_ASSIGNMENT_ALL: 'api.get.self.assignment.all',
    API_GET_GROUP_WITH_ASSIGNMENTS: 'api.get.group.with.assignments',
    API_GET_GROUP_WITH_MEMBERS: 'api.get.group.with.members',
    API_GET_GROUP_BY_ROLES: 'api.get.group.by.roles',
    API_GET_EXAM_BY_ROLES: 'api.get.exam.by.roles',
    
    // Download
    API_USER_DOWNLOAD_SOAL: 'api.user.download.soal',
    API_USER_DOWNLOAD_FILE: 'api.user.download.file',
    API_USER_EXPORT_SCORE: 'api.user.export.score',
    API_USER_EXPORT_MAHASISWA_PSC: 'api.user.export.mahasiswa.psc',

    API_GET_ASSIGNMENT_MEMBERS_WITH_SISTEM_SCORES: 'api.get.assignment.members.with.sistem.scores',
  };
  