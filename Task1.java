import java.util.*;

public class Task1 {
    public static void NumberGame() {
        Scanner sc = new Scanner(System.in);
        boolean playAgain = true;
        int totalScore = 0;
        int roundsWon = 0;
        int AllTotalScore = 0;
        int AllRoundPlay = 0;

        while (playAgain) {
            int randNumber = (int)(100 * Math.random()) + 1;
            int attempts = 0;
            System.out.println("------------------------------------------------------------");
            System.out.println("Guess the number between 1 and 100. You have 8 attempts.");
            System.out.println("------------------------------------------------------------");
            boolean correctGuess = false;

            while (attempts <= 8 && !correctGuess) {
                System.out.println("Enter your guess: ");
                int guess = sc.nextInt();

                if (guess == randNumber) {
                    System.out.println("------------------------------------------------------------");
                    System.out.println("Congratulations! You guessed the number.");
                    totalScore = 8 - attempts; 
                    AllTotalScore= totalScore + AllTotalScore;
                    correctGuess = true;
                    roundsWon++;
                } else if (guess > randNumber) {
                    System.out.println("Too high. Try again.");
                } else {
                    System.out.println("Too low. Try again.");
                }
                attempts++;
            }

            if (!correctGuess) {
                System.out.println("------------------------------------------------------------");
                System.out.println("Sorry, you've used all your attempts. The correct number was " + randNumber);
                System.out.println("------------------------------------------------------------");
            }

            System.out.println("Your total score is: " + totalScore);
            System.out.println("Rounds won: " + roundsWon);
            System.out.println("------------------------------------------------------------");
            AllRoundPlay++;
            System.out.print("Do you want to play again? (yes/no): ");
            String response = sc.next();
            if (!response.equalsIgnoreCase("yes")) {
                playAgain = false;
            }
        }
        System.out.println("------------------------------------------------------------");
        System.out.println("Thank you for playing! Your final score of all rounds is: " + AllTotalScore); 
        System.out.println("Total rounds played: " + AllRoundPlay );
        System.out.println("Total rounds won: " + roundsWon ); 
        sc.close();
        System.out.println("------------------------------------------------------------");
    }

    public static void main(String[] args) {
        NumberGame();
    }
}
