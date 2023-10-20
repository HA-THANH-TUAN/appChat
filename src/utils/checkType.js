const optionTypeCustom = {
  idCheck: {
    customTypes: {
      idCheck: {
        typeOf: 'String',
        validate: function (x) {
          return x.length === 24;
        },
      },
    },
  },
};

module.exports = optionTypeCustom;
