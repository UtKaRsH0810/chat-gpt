module.exports.validateEmptyReqBody = (body)=>{
    if(!body || Object.keys(body).length == 0)
        throw new BadRequestError('Missing Request Body')
}