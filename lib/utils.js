const utils = {
  collection: {
    getNextNo: function (collection) {
      const max_no = Test.findOne({}, { sort: { no: -1 } });
      return (max_no === undefined) ? 0 : max_no.no + 1;
    }
  }
};
