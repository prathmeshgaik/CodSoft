import java.util.*;
public class Task2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("___________________________________________");
        System.out.println("Enter number of subject :");
        int sub = sc.nextInt();
        System.out.println("___________________________________________");
        int totalMarks = 0;
        for (int i = 1; i <= sub; i++) {
            System.out.println("Enter Marks for Subject " + i);
            int marks = sc.nextInt();
            totalMarks = totalMarks +  marks;

        }
        System.out.println("___________________________________________");
        double AVGpercentage = (double) totalMarks/sub;
        String grade;
        if (AVGpercentage >= 90) {
            grade = "A";
        } else if (AVGpercentage >= 80) {
            grade = "B";
        } else if (AVGpercentage >= 70) {
            grade = "C";
        } else if (AVGpercentage >= 60) {
            grade = "D";
        } else if (AVGpercentage >= 35) {
            grade = "E";
        } else {
            grade = "F";
        }
        System.out.println("Calculate Total Marks: "+totalMarks);
        System.out.printf("Calculate Average Percentage: %.2f%%\n", AVGpercentage);
        System.out.println("Grade: "+grade);
        sc.close();
        System.out.println("___________________________________________");

    }
}
