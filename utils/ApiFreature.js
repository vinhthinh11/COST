module.exports = class APIFeature {
  constructor(query, { page, sort, limit, fields, ...queryString }) {
    this.query = query;
    this.queryString = queryString;
    this.page = page || 1;
    this.sort = sort;
    this.limit = limit || 10;
    this.fields = fields;
  }

  filter() {
    //  xu ly this queryString cho $ sign
    let query = JSON.stringify(this.queryString);
    query = query.replace(/\b(gt|lt|gte|lte)\b/g, math => `$${math}`);
    this.query = this.query.find(JSON.parse(query));
    return this;
  }

  sortPro() {
    if (!this.sort) return this;
    const sortBy = this.sort.split(',').join(' ');
    this.query = this.query.sort(sortBy);
    return this;
  }

  paginate() {
    const itemSkip = (this.page - 1) * this.limit;
    this.query = this.query.skip(itemSkip).limit(this.limit);
    return this;
  }

  getField() {
    if (!this.fields) return this;
    const fieldsLimit = this.fields.split(',').join(' ');
    this.query = this.query.select(fieldsLimit);
    return this;
  }
};
