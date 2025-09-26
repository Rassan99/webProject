/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dp_project;

/**
 *
 * @author jood2
 */

final class AddOperation implements CalculatorOperation {
    @Override public float apply(float a, float b) { return a + b; }
    @Override public String symbol() { return "+"; }
}

final class SubtractOperation implements CalculatorOperation {
    @Override public float apply(float a, float b) { return a - b; }
    @Override public String symbol() { return "-"; }
}

final class MultiplyOperation implements CalculatorOperation {
    @Override public float apply(float a, float b) { return a * b; }
    @Override public String symbol() { return "×"; }
}

final class DivideOperation implements CalculatorOperation {
    @Override public float apply(float a, float b) {
        if (b == 0f) throw new ArithmeticException("Division by zero");
        return a / b;
    }
    @Override public String symbol() { return "÷"; }
}