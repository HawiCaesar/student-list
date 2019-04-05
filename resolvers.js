const resolvers = {
  Query: {
    async getStudent(root, { id }, { models }) {
      return models.Student.findByPk(id);
    },
    async getAllStudents(root, args, { models }) {
      return models.Student.findAll();
    },
    async getHobbies(root, { id }, { models }) {
      return models.Hobbies.findByPk(id);
    }
  },
  Mutation: {
    createStudent: async (parent, { firstName, email }, { models }) => {
      const addedUser = await models.Student.create({
        firstName,
        email
      });
      return addedUser;
    },
    createHobbies: async (root, { studentId, title }, { models }) => {
      return models.Hobbies.create({ studentId, title });
    }
  },
  Student: {
    async hobbies(hobbies) {
      return hobbies.getHobbies();
    }
  },
  Hobbies: {
    async student(student) {
      return student.getStudent();
    }
  }
};

module.exports = resolvers;
