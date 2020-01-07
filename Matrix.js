class Matrix{

	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for(let i = 0; i < this.rows; i++){
			this.data[i] = [];
			for(let j = 0; j < this.cols; j++){
				this.data[i][j] = 0;
			}
		}
	}

	// Multiplies two matrices
	static multiply(m1, m2){
		// Matrix product
    	if (m1.cols !== m2.rows) {
    	  console.log('Columns of A must match rows of B.')
    	  return undefined;
    	}
    	let result = new Matrix(m1.rows, m2.cols);
    	for (let i = 0; i < result.rows; i++) {
    	  for (let j = 0; j < result.cols; j++) {
    	    // Dot product of values in col
    	    let sum = 0;
    	    for (let k = 0; k < m1.cols; k++) {
    	      sum += m1.data[i][k] * m2.data[k][j];
    	    }
    	    result.data[i][j] = sum;
    	  }
    	}
    	return result;
	}

	// Maps the func passed onto the matrix
	static map(matrix, func){
		let aux = new Matrix(matrix.rows, matrix.cols);
		for(let i = 0; i < matrix.rows; i++){
			for(let j = 0; j < matrix.cols; j++){
				let val = matrix.data[i][j];
				aux.data[i][j] = func(val);
			}
		}
		return aux;
	}

	// Substracts 2 matrices
	static subtract(a, b) {
 	   // Return a new Matrix a-b
 	   let result = new Matrix(a.rows, a.cols);
 	   for (let i = 0; i < result.rows; i++) {
  	    for (let j = 0; j < result.cols; j++) {
  	      result.data[i][j] = a.data[i][j] - b.data[i][j];
  	    }
  	  }
  	  return result;
  	}

	// Transposes a matrix
	static transpose(matrix) {
    	let result = new Matrix(matrix.cols, matrix.rows);
    	for (let i = 0; i < matrix.rows; i++) {
    	  for (let j = 0; j < matrix.cols; j++) {
    	    result.data[j][i] = matrix.data[i][j];
    	  }
   	 	}
  	  return result;
 	}

	// Creates a vector matrix from the array
	static fromArray(arr){
		let aux = new Matrix(arr.length, 1);
		for(let i = 0; i < arr.length; i++){	
			aux.data[i][0] = arr[i];
		}
		return aux;
	}

	static deserialize(data) {
    	if (typeof data == 'string') {
    	  let newData = JSON.parse(data);
    	}
    	let matrix = new Matrix(newData.rows, newData.cols);
    	matrix.data = newData.data;
    	return matrix;
  	}

	copy() {
	    let m = new Matrix(this.rows, this.cols);
	    for (let i = 0; i < this.rows; i++) {
	      for (let j = 0; j < this.cols; j++) {
	        m.data[i][j] = this.data[i][j];
	      }
	    }
	    return m;
	}


	// Returns an array filled with the matrix values
	toArray(){
		let aux = [];
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				aux.push(this.data[i][j]);
			}
		}
		return aux;
	}

	// Maps the caller matrix with the passed function
	map(func){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				let val = this.data[i][j];
				this.data[i][j] = func(val);
			}
		}
	}

	//Adds this and the passed matrix;
	add(n) {
  		  if (n instanceof Matrix) {
  		    for (let i = 0; i < this.rows; i++) {
  		     for (let j = 0; j < this.cols; j++) {
  		       this.data[i][j] += n.data[i][j];
  		     }
  		   }
  		 } else {
  		   for (let i = 0; i < this.rows; i++) {
  		     for (let j = 0; j < this.cols; j++) {
  		       this.data[i][j] += n;
  		    }
  		  }
  		}
  	}

	// Either multiplies the whole matrix with a number, or does a elementary matrix multiplication
	multiply(n) {
	    if (n instanceof Matrix) {
	      // hadamard product
	      for (let i = 0; i < this.rows; i++) {
	        for (let j = 0; j < this.cols; j++) {
	          this.data[i][j] *= n.data[i][j];
	        }
	      }
	    } else {
	      // Scalar product
	      for (let i = 0; i < this.rows; i++) {
	        for (let j = 0; j < this.cols; j++) {
	          this.data[i][j] *= n;
	        }
	      }
	    }
	  }

	subtract(matrix){
		if(this.rows !== matrix.rows || this.cols !== matrix.cols){
			console.log("Cols or Rows of the passed matrix do not match");
			return undefined;
		}else{
			for(let i = 0; i < this.rows; i++){
				for(let j = 0; j < this.cols; j++){
					this.data[i][j] -= matrix.data[i][j];
				}
			}
		}
	}

	// Fills the caller with random values between - 1 ... 1
	randomize(){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				this.data[i][j] = Math.random() * 2 - 1
			}
		}
	}

	print(){
		console.table(this.data);
	}

	serialize() {
   		return JSON.stringify(this);
 	}
}


if (typeof module !== 'undefined') {
  module.exports = Matrix;
}