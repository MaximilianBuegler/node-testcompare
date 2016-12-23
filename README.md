# node-testcomparison
Helper function for comparisons in unit tests

# Notes
    Compares two variables for being identical, using a threshold for numerical comparisons.
    
# Installation
    npm install testcomparison --save

# Usage
    var compare = require('testcomparison');
    
    var value1={a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true};
    var value2={a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true};
    console.log(compare(value1,value2,0.001)); //returns true
    
    var value3={a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abcd",f:true};
    console.log(compare(value1,value3,0.001)); //returns false

# Example test

    var compare = require('testcomparison'),
        fs = require('fs');

Preparation for test:
    
    //Run some function
    var res=someFunctionToBeTested();
    
    //Store output in JSON file
    fs.writeFileSync('test/data/res.json',JSON.stringify(res),'utf8');
    
Actual test:

    //Run some function
    var res=someFunctionToBeTested();
    
    //Load JSON file and assert output of function to still match the earlier produced result
    assert(compare(res,JSON.parse(fs.readFileSync('test/data/set1_res.json','utf8')),0.001));



# Test
    npm test

Returns:

        Compare with undefined
          ✓ Test 1 - Both variables undefined
          ✓ Test 2 - First variable undefined
          ✓ Test 3 - Second variable undefined
      
        Compare with null
          ✓ Test 1 - Both variables null
          ✓ Test 2 - First variable null
          ✓ Test 3 - Second variable null
      
        Compare Arrays
          ✓ Test 1 - Two empty arrays
          ✓ Test 2 - First array empty
          ✓ Test 3 - Second array empty
          ✓ Test 4 - No array empty, but same size
          ✓ Test 5 - arrays of different sizes
          ✓ Test 6 - arrays with other variables
          ✓ Test 7 - 2D arrays
      
        Compare Strings
          ✓ Test 1 - Two empty strings
          ✓ Test 2 - First string empty
          ✓ Test 3 - Second string empty
          ✓ Test 4 - No string empty, but same size
          ✓ Test 5 - strings of different sizes
      
        Compare booleans
          ✓ Test 1
      
        Compare object arrays
          ✓ Test 1 - Both arrays empty
          ✓ Test 2 - First array empty
          ✓ Test 3 - Second array empty
          ✓ Test 4 - No array empty
      
      
        23 passing (12ms)

        

# License

MIT License

Copyright (c) 2016 Maximilian Bügler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
