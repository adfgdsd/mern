class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}
        this.query = this.query.find({ ...keyword })
        // console.log(keyword);
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // console.log(queryCopy);
        // removing fields from category
        const removeFiled = ["keyword", "page", "limit"];
        removeFiled.forEach(key => delete queryCopy[key])

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr))
        return this

    };


    pagination(resultParPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultParPage * (currentPage -1);
        this.query = this.query.limit(resultParPage).skip(skip);

        return this;

    }
}


module.exports = ApiFeatures;