class BaseService {
    constructor(model) {
      this.model = model
    }
  
    create(resource) {
      return this.model.create(resource)
    }
  
    update(id, updateParams) {
      return this.model.findByIdAndUpdate(id, { $set: updateParams})
    }
  
    index(options = {}) {
      return this.model.find(options);
    }
  
    show(field, value) {
      return this.model.find({ [field]: value }).exec();
    }
  
    destroy(field, value) {
      return this.model.findOneAndRemove({ [field]: value }).exec();
    }
  }
  
  export default BaseService