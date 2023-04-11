// Import the chalk module for colorizing console logs.
import chalk from "chalk";

// This is a recursive function that finds the greatest common divisor (GCD) of two numbers using Euclid's algorithm.
// It works by repeatedly taking the remainder of dividing the larger number by the smaller number,
// and then swapping the two numbers until the remainder is 0.
// At each step, it prints the current values of a and b, and the remainder after division.
function gcd(a, b) {
    if (b == 0) {
        console.log(`GCD(${a}, ${b}) = ${a}`);
        return a;
    } else {
        console.log(`GCD(${a}, ${b}) = GCD(${b}, ${a % b})`);
        return gcd(b, a % b);
    }
}

// This function uses Shor's algorithm to factor a number N.
function shor(N) {
    console.log(chalk.yellow(`Factoring the number ${N} using Shor's algorithm...`));

    // Start by choosing a random integer a between 1 and N-1.
    var a = Math.ceil(Math.sqrt(N));
    var period = -1;

    // Keep trying different values of a until we find a period that works.
    while (period == -1) {
        console.log(chalk.blue(`Trying a = ${a}...`));

        // Initialize variables for the algorithm.
        var x = a;
        var r = 1;

        // Compute the function f(x) = a^x mod N.
        // We use a classical algorithm to find the period of this function.
        for (var i = 1; i <= a; i++) {
            x = (x * a) % N;  // Compute a^i mod N.
            r = (r * x) % N;  // Compute f(a^i) = a^(i+1) mod N.
        }

        console.log(chalk.green(`Computed the function f(x) = a^x mod N for a = ${a}.`));

        // Use the GCD algorithm to find a nontrivial factor of N.
        console.log(chalk.red.bgGray(`Finding a nontrivial factor of ${N} using GCD...`));
        var factor = gcd(r - 1, N);
        console.log(chalk.red.bgGray(`Found a factor of ${N} using GCD: ${factor}.`));

        // If the factor is not 1 or N, we have successfully factored N.
        if (factor != 1 && factor != N) {
            console.log(chalk.blue(`Found a nontrivial factor of ${N}: ${factor}.`));
            period = a;
        } else {
            // If the factor is 1 or N, try a different value of a.
            a++;
        }
    }

    // Return the nontrivial factor of N.
    console.log(chalk.yellow.bgBlack(`Finished! factoring ${N}. The nontrivial factors are ${factor} and ${N/factor}.`));
    return [factor, N / factor];
}

const num = 30;
shor(num);
