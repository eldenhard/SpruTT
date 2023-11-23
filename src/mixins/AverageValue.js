export default{
  
    methods: {
        AverageValue(value){
            if(Array.isArray(value)){
                let sumMean = 0
                for(let i of value){
                  sumMean += i
                }
                return Math.floor(sumMean/value.length)
            } else {
                return '—'
            }
           
        }
    }
}