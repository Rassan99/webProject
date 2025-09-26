/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dp_project;

/**
 *
 * @author jood2
 */
public interface CalculatorOperation {
    float apply(float a, float b) throws ArithmeticException;
    String symbol();
}
