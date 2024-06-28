import java.util.*;

public class ATM {
    private BankAccount Account;

    public ATM(BankAccount Account) {
            this.Account = Account;
    }

    public void displayMenu() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("-----------------------------------------");
            System.out.println("Welcome to the xyz ATM ");
            System.out.println("Select your transaction.");
            System.out.println("-----------------------------------------");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Exit");
            System.out.print("Please choose an option: ");

            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    checkBalance();
                    break;
                case 2:
                    deposit(scanner);
                    break;
                case 3:
                    withdraw(scanner);
                    break;
                case 4:
                    System.out.println("Thank you for using the xyz ATM. Goodbye!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private void checkBalance() {
        System.out.println("Your current balance is: Rs. " + Account.getBalance());
    }

    private void deposit(Scanner scanner) {
        System.out.print("Enter amount to deposit: Rs. ");
        double amount = scanner.nextDouble();
        if (Account.deposit(amount)) {
            System.out.println("Successfully deposited Rs. " + amount);
        } else {
            System.out.println("Invalid amount. Please try again.");
        }
    }

    private void withdraw(Scanner scanner) {
        System.out.print("Enter amount to withdraw: Rs. ");
        double amount = scanner.nextDouble();
        if (Account.withdraw(amount)) {
            System.out.println("Successfully withdrew Rs. " + amount);
        } else {
            System.out.println("Insufficient balance or invalid amount. Please try again.");
        }
    }

    public static void main(String[] args) {
        // Default initial balance is 10000
        BankAccount Account = new BankAccount(10000); 
        ATM atm = new ATM(Account);
        atm.displayMenu();
    }
}
