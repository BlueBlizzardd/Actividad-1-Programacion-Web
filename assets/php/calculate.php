<?php
    if(isset($_POST['employees']) && !empty($_POST['employees'])) {
        $employees = $_POST['employees'];
        $femTotal = 0;
        $maleTotal = 0;
        $marriedMales = 0;
        $widowedFemales = 0;
        $avgMAge = 0;

        $response = array(
            'employees' => $employees,
            'results' => ''
        );

        foreach($employees as $emp) {
            if($emp['gender'] === 'female') {
                $femTotal++;

                if($emp['marital'] === 'widowed' && $emp['salary'] > 1000 && $emp['salary'] < 2500) {
                    $widowedFemales++;
                } 
            }
            else {
                $maleTotal++;
                $avgMAge += $emp['age'];

                if($emp['marital'] === 'married' && $emp['salary'] > 2500) {
                    $marriedMales++;
                }
            }
        }

        $avgMAge = ($maleTotal > 0) ? $avgMAge / $maleTotal : 0;

        $response['results'] = "<p>Female Employee Total: $femTotal</p>
        <p>Married Males with a Salary >2500: $marriedMales</p>
        <p>Widowed Females with a Salary >1000: $widowedFemales</p>
        <p>Average Male Age: $avgMAge</p>";

        echo json_encode($response);    
    } else {
        echo "Empty values. Try again.", "<br>";
        echo '<a href="javascript:history.back()">Try again</a>';
    }
?>