const devLog = (data: unknown) => {

    if (process.env.NODE_ENV !== 'production')
        return console.log(data)
    else return;
}
export default devLog