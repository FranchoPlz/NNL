function nextGeneration(population_array){
	
	calculateFitness(population_array);
	for(let i = 0; i < population_array; i++){
		let parents = pickFitest(population_array);
		let child = crossover(parents);
		mutate(child);
		population[i] = child;
	}
}

function mutate(child){
	child.mutate(0.1)
}

function calculateFitness(population_array){
	let sum = 0;
	for(let object of population_array){
		sum+= object.score;
	}

	for(let object of population_array){
		object.fitness = object.score / sum;
	}
}

function pickFitest(population_array){
	let fitest = [];
	for(let i = 0; i < 2; i++){
		let index = 0;
		let r = random(1);

		while(r > 0){
			r = r - population_array[index].fitness;
			index++;
		}
		index--;

		fitest.push(population_array[index]);
	}
	return fitest;
}

function crossover(fitest_population_array){
	let parent_brain_A = fitest_population_array[0];
	let parent_brain_B = fitest_population_array[1];

	let wb_A = parent_brain_A.getWeightsAndBiases();
	let wb_B = parent_brain_B.getWeightsAndBiases();

	let start = floor(random(wab_A.length, wb_B.length));
	let end = floor(random(start + 1, wab_A,length))
	let child_data = wb_A.slice(start, end);

	for(let i = 0; i < wb_B.length; i++){
		let aux = wb_B[i];
		if(!child_data.includes(aux)){
			if(i < start){
				child_data.unshift(aux);
			}else{
				child_data.push(aux);
			}
		}
	}

	let child = new NeuralNetwork(parent_brain_A.input_nodes, parent_brain_A.hidden_nodes, parent_brain_A.output_nodes);
	child.setWeightsAndBiases(child_data);
	return child;

}