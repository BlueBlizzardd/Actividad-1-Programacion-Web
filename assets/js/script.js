const btn = document.querySelector('.submit');
const responseStatus = document.querySelector(".resp");
const responseTable = document.querySelector('#responseTable');
const results = document.querySelector('#results');
const employees = [];

btn.addEventListener("click", () => {
    const params = {
        "fname": $('#fname').val(),
        "lname": $('#lname').val(),
        "age": $('#age').val(),
        "marital": $('#marital').val(),
        "gender": $('.gender:checked').val(),
        "salary": $('#salary').val()
    };

    employees.push(params);

    $.ajax({
        url: "assets/php/calculate.php",
        type: "POST",
        dataType: "json",
        data: { employees: employees },
        beforeSend: function() {
            responseStatus.textContent = "Awaiting for a response";
        },
        success: function(resp) {
            console.log(resp);

            let newRow = '';
            for(let i = 0; i < resp.employees.length; i++) {
                newRow += `<tr>
                    <td>${resp.employees[i].fname}</td>
                    <td>${resp.employees[i].lname}</td>
                    <td>${resp.employees[i].age}</td>
                    <td>${resp.employees[i].marital}</td>
                    <td>${resp.employees[i].gender}</td>
                    <td>${resp.employees[i].salary}</td>
                </tr>`;
            }
            responseTable.innerHTML = newRow;
            results.innerHTML = resp.results;
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            responseStatus.textContent = `${textStatus, errorThrown}`;
        } 

    })

    document.querySelector('.form').reset();
})