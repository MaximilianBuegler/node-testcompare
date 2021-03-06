/*===========================================================================*\
 * Helper function for comparisons in unit tests
 *
 * Compares two variables for being identical, using a threshold for numerical comparisons.
 *
 * (c) 2016 Maximilian Bügler
 *
 *
 *===========================================================================*/



var assert = require('assert'),
    compare = require('../');

describe('Compare with undefined', function () {
    it('Test 1 - Both variables undefined', function () {
        assert(compare(undefined,undefined,0.001));
    });
    it('Test 2 - First variable undefined', function () {
        assert(!compare(undefined,[],0.001));
        assert(!compare(undefined,1,0.001));
        assert(!compare(undefined,{},0.001));
        assert(!compare(undefined,{a:1},0.001));
        assert(!compare(undefined,"a",0.001));
        assert(!compare(undefined,"undefined",0.001));
        assert(!compare(undefined,null,0.001));
        assert(!compare(undefined,true,0.001));
        assert(!compare(undefined,false,0.001));
    });
    it('Test 3 - Second variable undefined', function () {
        assert(!compare([],undefined,0.001));
        assert(!compare(1,undefined,0.001));
        assert(!compare({},undefined,0.001));
        assert(!compare({a:1},undefined,0.001));
        assert(!compare("a",undefined,0.001));
        assert(!compare("undefined",undefined,0.001));
        assert(!compare(null,undefined,0.001));
        assert(!compare(false,undefined,0.001));
        assert(!compare(true,undefined,0.001));
    });   
});

describe('Compare with null', function () {
    it('Test 1 - Both variables null', function () {
        assert(compare(null,null,0.001));
    });
    it('Test 2 - First variable null', function () {
        assert(!compare(null,[],0.001));
        assert(!compare(null,1,0.001));
        assert(!compare(null,{},0.001));
        assert(!compare(null,{a:1},0.001));
        assert(!compare(null,"a",0.001));
        assert(!compare(null,"null",0.001));
        assert(!compare(null,undefined,0.001));
        assert(!compare(null,false,0.001));
        assert(!compare(null,true,0.001));
    });
    it('Test 3 - Second variable null', function () {
        assert(!compare([],null,0.001));
        assert(!compare(1,null,0.001));
        assert(!compare({},null,0.001));
        assert(!compare({a:1},null,0.001));
        assert(!compare("a",null,0.001));
        assert(!compare("null",null,0.001));
        assert(!compare(undefined,null,0.001));
        assert(!compare(true,null,0.001));
        assert(!compare(false,null,0.001));
    });
    
});


describe('Compare Arrays', function () {
    it('Test 1 - Two empty arrays', function () {
        assert(compare([],[],0.001));
    });
    it('Test 2 - First array empty', function () {
        assert(!compare([],[1,2,3],0.001));
    });
    it('Test 3 - Second array empty', function () {
        assert(!compare([1,2,3],[],0.001));
    });
    it('Test 4 - No array empty, but same size', function () {
        assert(compare([1,2,3],[1,2,3],0.001));
        assert(!compare([1,2,3],[3,2,1],0.001));
        assert(!compare([3,2,1],[1,2,3],0.001));
        assert(!compare([undefined,undefined,undefined],[1,2,3],0.001));
        assert(!compare([1,2,3],[undefined,undefined,undefined],0.001));
    });
    it('Test 5 - arrays of different sizes', function () {
        assert(!compare([1,2,3],[1,2,3,4],0.001));
        assert(!compare([1,2,3,4],[1,2,3],0.001));
    });
    it('Test 6 - arrays with other variables', function () {
        assert(!compare([1,2,3],1,0.001));
        assert(!compare(1,[1,2,3,4],0.001));
        assert(!compare([1,2,3],{a:1},0.001));
        assert(!compare({a:1},[1,2,3,4],0.001));
        assert(!compare([1,2,3],undefined,0.001));
        assert(!compare(undefined,[1,2,3,4],0.001));
        assert(!compare([1,2,3],"a",0.001));
        assert(!compare("a",[1,2,3,4],0.001));
    });
    it('Test 7 - 2D arrays', function () {
        assert(compare([[1,2],[3,4]],[[1,2],[3,4]],0.001));
        assert(!compare([[1,2],[3,4]],[[1,2],[3,3]],0.001));
        assert(!compare([[1,2],[3,4]],[[1,2],[3,undefined]],0.001));
        assert(!compare([[1,2],[3,undefined]],[[1,2],[3,4]],0.001));
        assert(compare([[1,2],["three",4]],[[1,2],["three",4]],0.001));
        assert(!compare([[1,2],["three",4]],[[1,2],[3,4]],0.001));
        assert(!compare([[1,2],[3,4]],[[1,2],[3,null]],0.001));
        assert(!compare([[1,2],[3,null]],[[1,2],[3,4]],0.001));
    });    
});

describe('Compare Strings', function () {
    it('Test 1 - Two empty strings', function () {
        assert(compare("","",0.001));
    });
    it('Test 2 - First string empty', function () {
        assert(!compare("","abc",0.001));
    });
    it('Test 3 - Second string empty', function () {
        assert(!compare("abs","",0.001));
    });
    it('Test 4 - No string empty, but same size', function () {
        assert(compare("abc","abc",0.001));
        assert(!compare("abc","cba",0.001));        
    });
    it('Test 5 - strings of different sizes', function () {
        assert(!compare("abcd","abc",0.001));
        assert(!compare("abc","abcd",0.001));
    });
});

describe('Compare booleans', function () {
    it('Test 1', function () {
        assert(compare(false,false,0.001));
        assert(!compare(true,false,0.001));
        assert(!compare(false,true,0.001));
        assert(compare(true,true,0.001));
    });
    it('Test 2', function () {
        assert(compare(false,0,0.001));
        assert(!compare(0,false,0.001));
        assert(!compare(1,true,0.001));
        assert(compare(true,1,0.001));
    });    
});

describe('Compare object arrays', function () {
    it('Test 1 - Both arrays empty', function () {
        assert(compare({},{},0.001));
    });
    it('Test 2 - First array empty', function () {
        assert(!compare({},{a:1},0.001));
    });
    it('Test 3 - Second array empty', function () {
        assert(!compare({a:1},{},0.001));
    });    
    it('Test 4 - No array empty', function () {
        assert(compare({a:1},{a:1},0.001));
        assert(!compare({a:1},{a:2},0.001));
        assert(!compare({a:1},{b:1},0.001));
        assert(compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:false},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:false},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:undefined,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc"},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc"},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abcd",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,null,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:true,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},0.001));
        assert(!compare({a:[1,2,3],b:[4,5,6],c:undefined,d:null,e:"abc",f:true},{a:[1,2,3],b:[4,5,6],c:false,d:null,e:"abc",f:true},0.001));
    });
    it('Test 5 - First element not object', function () {
        assert(!compare(1,{a:1},0.001));
    });
    it('Test 6 - Second element not object', function () {
        assert(!compare({a:1},1,0.001));
    });
    it('Test 7 - Protoypes', function () {
	var prototypeTest={}
	Object.prototype.add = function (a,b) {this[a]=b;}
	prototypeTest.add(1,1);
        assert(!compare(prototypeTest,{},0.001));
	assert(!compare({},prototypeTest,0.001));
	assert(compare(prototypeTest,prototypeTest,0.001));
    });


});

describe('Compare numbers', function () {
    it('Test 1 - Both numbers equal - threshold 0', function () {
        assert(compare(1,1,0));
    });
    it('Test 2 - Both numbers within threshold', function () {
        assert(compare(1,0.9,0.1));
        assert(compare(1,1.1,0.1));
        assert(compare(0,0.1,0.1));
        assert(compare(0.1,0,0.1));
    });
    it('Test 3 - Both numbers not within threshold', function () {
        assert(!compare(1,0.8,0.1));
        assert(!compare(1,2.1,0.1));
        assert(!compare(0,0.2,0.1));
        assert(!compare(0.2,0,0.1));
    });    
    it('Test 4 - One number infinity', function () {
        assert(!compare(Infinity,0,0.1));
        assert(!compare(0,Infinity,0.1));
        assert(!compare(-Infinity,0,0.1));
        assert(!compare(0,-Infinity,0.1));        
    });
    it('Test 5 - Both numbers infinity', function () {
        assert(compare(Infinity,Infinity,0.1));
        assert(compare(-Infinity,-Infinity,0.1));
        assert(!compare(Infinity,-Infinity,0.1));
        assert(!compare(-Infinity,Infinity,0.1));
    });        
});

describe('Comparing functions returns false to prevent false positives', function () {
    it('Test 1 - First variable is function', function () {
        assert(!compare(function(){},0,0));
    });
    it('Test 2 - Second variable is function', function () {
        assert(!compare(0,function(){},0));
    });
    it('Test 3 - Both variables are functions', function () {
        assert(!compare(function(){},function(){},0));
    });
    
});
