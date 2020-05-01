const User = require('../../models/user')

/**
 * Create
 * @class
 */
class Create {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/user/new`, async (req, res) => {
      try {
        const userModel = new this.UserModel(req.body)
        // await userModel.generateAuthToken()
        userModel.setSlug()
        res.status(201).send({userModel})
        userModel.save()
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = Create