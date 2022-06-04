export class fund {
    constructor(name, realistic, optimistic, pessimistic, years, initialDeposit, monthlyDeposit){
        this.name = name;
        this.realistic = realistic; 
        this.optimistic = optimistic;
        this.pessimistic = pessimistic;
        this.years = years;
        this.initialDeposit = initialDeposit;
        this.monthlyDeposit = monthlyDeposit;
        this.totalDeposit = ((years * 12 ) * monthlyDeposit) + initialDeposit;   
    }
    expectedReturns(){
  	    const MONTHS = this.years * 12;
        let interests = [this.realistic, this.optimistic, this.pessimistic];
        const EXPECTED_RETURNS = [];
        interests = interests.map((el)=>{
            const TOTAL = [];
            for(let i = 1; i <= MONTHS; i++){
                let sum = 0;
                sum += Math.round(this.initialDeposit* Math.pow((1 + el), i));
                
                for(let j = 0; j<i; j++){
                    sum += Math.round(this.monthlyDeposit * Math.pow((1 + el), j));
         
                }
                TOTAL.push(sum);
                sum = 0;
                
            }

            EXPECTED_RETURNS.push(TOTAL);

        });
 		
        return EXPECTED_RETURNS;
       
    }
};