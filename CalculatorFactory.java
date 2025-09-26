package dp_project;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author jood2
 */

public final class CalculatorFactory {
    private CalculatorFactory() {}

    public static CalculatorOperation create(String symbol) {
        if (symbol == null) return null;
        switch (symbol) {
            case "+": return new AddOperation();
            case "-": return new SubtractOperation();
            case "×":
            case "*": return new MultiplyOperation();
            case "÷":
            case "/": return new DivideOperation();
            default:  return null; // or throw new IllegalArgumentException("Unknown op: " + symbol)
        }
    }
}
