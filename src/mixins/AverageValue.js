export default{
    methods: {
        AverageValue(value){
            console.log(value)
            if(Array.isArray(value)){
                let sumMean = 0
                for(let i of value){
                  sumMean += i
                }
                return sumMean/value.length.toFixed(2)
            } else {
                return '—'
            }
           
        }
    }
}