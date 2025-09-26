package dp_project;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */

/**
 *
 * @author jood2
 */
public class App {
    public static void main(String[] args) {
       Calculator calculator = Calculator.getInstance(); // Retrieve the single instance of Calculator (Singleton pattern)
       calculator.setVisible(true);
    }
}
