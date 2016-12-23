/*===========================================================================*\
 * Helper function for comparisons in unit tests
 *
 * Compares two variables for being identical, using a threshold for numerical comparisons.
 *
 * (c) 2016 Maximilian Bügler
 *
 *===========================================================================*/


module.exports = {
    /**
     * Compares value result with desired allowing a deviation of threshold for any (contained) numerical values
     *
     * @param result first value for comparison
     * @param desired second value for comparison
     * @param {number} threshold maximum allowed deviation for any (contained) numerical values
     *
     * @returns true is both values match
     **/
    compare: function (result, desired,threshold) {
        if (result===undefined){
            return desired===undefined;
        }
        else if (desired===undefined){
            return false;
        }
        if (result===null){
            return desired===null;
        }
        else if (desired===null){
            return false;
        }
        
        if (Array.isArray(desired)){
            if (!Array.isArray(result)){
                return false;
            }
            if (result.length!==desired.length){
                return false;
            }
            for (var i=0;i<result.length;i++){
                if (!module.exports.compare(result[i],desired[i],threshold)){
                    return false;
                }
            }
            return true;
        }
        else if (desired instanceof Object){
            if (!(result instanceof Object)){
                return false;
            }
            var prop;
            for(prop in desired){
                if(desired.hasOwnProperty(prop)){
                    if (!result.hasOwnProperty(prop)){
                        return false;
                    }
                    if (!module.exports.compare(result[prop],desired[prop],threshold)){
                        return false;
                    }
                }
            }
            for(prop in result){
                if(result.hasOwnProperty(prop)){
                    if (!desired.hasOwnProperty(prop)){
                        return false;
                    }
                }
            }
            
            return true;
        }
        else if (typeof desired === 'string'){
            if (typeof result !== 'string'){
                return false;
            }
            return desired === result;
        }
        else if (typeof desired === 'boolean'){
            if (typeof result !== 'boolean'){
                return false;
            }
            return desired === result;
        }
        else{
            return equalWithThreshold(desired,result,threshold);
        }
    }
};


/**
 * Compares two numeric values for being equal with a given threshold.
 * 
 * Function from test setup in fft-js in https://github.com/vail-systems/node-fft
 * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
 *
 * @param {number} val1 first value
 * @param {number} val2 second value
 * @param {number} threshold maximum difference between val1 and val2
 *
 * @returns true if difference between val1 and val2 is less than threshold.
 **/
function equalWithThreshold(val1, val2, threshold) {
    return (val1 > val2 - threshold) &&
           (val1 < val2 + threshold);
}
