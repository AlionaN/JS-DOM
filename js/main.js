let appData = {
    expenses: {},
    optionalExpenses: '',
    income: [],
    savings: false
};

let start_calc = document.getElementById('start'),
    budget_value = document.querySelector('.budget-value'),
    daybudget_value = document.querySelector('.daybudget-value'),
    level_value = document.querySelector('.level-value'),
    expenses_value = document.querySelector('.expenses-value'),
    optionalexpenses_value = document.querySelector('.optionalexpenses-value'),
    income_value = document.querySelector('.income-value'),
    monthsavings_value = document.querySelector('.monthsavings-value'),
    yearsavings_value = document.querySelector('.yearsavings-value'),
    expenses_item = document.querySelectorAll('.expenses-item'),
    expenses_item_btn = document.querySelector('button.expenses-item-btn'),
    optionalexpenses_item = document.querySelectorAll('.optionalexpenses-item'),
    optionalexpenses_btn = document.querySelector('button.optionalexpenses-btn'),
    count_budget_btn = document.querySelector('button.count-budget-btn'),
    choose_income = document.querySelector('.choose-income'),
    check_savings = document.querySelector('#savings'),
    year_value = document.querySelector('.year-value'),
    month_value = document.querySelector('.month-value'),
    day_value = document.querySelector('.day-value'),
    choose_sum = document.querySelector('.choose-sum'),
    choose_percent = document.querySelector('.choose-percent');

    let money, time;
    
    expenses_item_btn.disabled = 'true';
    optionalexpenses_btn.disabled = 'true';
    count_budget_btn.disabled = 'true';
    expenses_item_btn.style.cursor = 'no-drop';
    optionalexpenses_btn.style.cursor = 'no-drop';
    count_budget_btn.style.cursor = 'no-drop';

    start_calc.addEventListener('click', function(){
        money = +prompt("Ваш бюджет на месяц?", "5000"),
        time = prompt('Введите дату в формате YYYY-MM-DD', '2020-09-02');
        while(isNaN(money) || money == '' || money == null){
        money = +(prompt("Ваш бюджет на месяц?", "5000"));
        }
        appData.budget = money;
        appData.date = time;
        budget_value.textContent = money.toFixed();
        year_value.value = new Date(Date.parse(time)).getFullYear();
        month_value.value = new Date(Date.parse(time)).getMonth() + 1;
        day_value.value = new Date(Date.parse(time)).getDate();
        expenses_item_btn.removeAttribute('disabled');
        optionalexpenses_btn.removeAttribute('disabled');
        count_budget_btn.removeAttribute('disabled');
        expenses_item_btn.removeAttribute('style');
        optionalexpenses_btn.removeAttribute('style');
        count_budget_btn.removeAttribute('style');
    });

    expenses_item_btn.addEventListener('click', function(){
        let sum = 0;
        for (let i=0; i <= expenses_item.length; i++){
            let a = expenses_item[i].value,
                b = expenses_item[++i].value;
            
            if (typeof(a) === 'string' && typeof(a) != null && 
                typeof(b) != null && a != '' && b != '' && 
                a.length < 50){
                    appData.expenses[a] = b;
                    sum += +b;
                    expenses_value.textContent = sum;
            } else {
                --i;
                console.log('bad input');
            }
        }
    });
    optionalexpenses_btn.addEventListener('click', function(){
        for (let i = 0; i < optionalexpenses_item.length; i++){
            let optExpenses = optionalexpenses_item[i].value;
            appData.optionalExpenses += optExpenses + ' ';
            optionalexpenses_value.textContent = appData.optionalExpenses;
        }
    });

    count_budget_btn.addEventListener('click', function(){
        if (appData.budget == undefined){
            alert('Нажмите "Начать расчет"');
        } else{

        let dayBudget = appData.budget;
        for (let key in appData.expenses){
            dayBudget -= appData.expenses[key];
        }
        appData.budgetPerDay = +(dayBudget/30).toFixed(2);
        daybudget_value.textContent = appData.budgetPerDay;

        if (appData.budgetPerDay < 100){
            level_value.textContent = 'Уровень достатка низкий';
        } else if (appData.budgetPerDay < 500){
            level_value.textContent = 'Уровень достатка средний';
        } else if (appData.budgetPerDay >= 500){
            level_value.textContent = 'Уровень достатка высокий';
        } else{
            level_value.textContent = 'Что-то пошло не так....';
        }
    }
    });

    choose_income.addEventListener('input', function(){
        let items = choose_income.value;
        appData.income = items.split(', ');
        income_value.textContent = appData.income;
    });

    check_savings.addEventListener('click', function(){
        if(appData.savings == true){
            appData.savings = false;
        } else{
            appData.savings = true;
        }
    });

    choose_sum.addEventListener('change', function(){
        if (appData.savings == true){
            let sum = +choose_sum.value,
                percent = +choose_percent.value;
            
            appData.month_value = sum/100/12*percent;
            appData.year_value = sum/100*percent;

            monthsavings_value.textContent = appData.month_value.toFixed(1);
            yearsavings_value.textContent = appData.year_value.toFixed(1);
        }
    });

    choose_percent.addEventListener('change', function(){
        if (appData.savings == true){
            let sum = +choose_sum.value,
                percent = +choose_percent.value;
            
            appData.month_value = sum/100/12*percent;
            appData.year_value = sum/100*percent;

            monthsavings_value.textContent = appData.month_value.toFixed(1);
            yearsavings_value.textContent = appData.year_value.toFixed(1);
        }
    });
    
   

