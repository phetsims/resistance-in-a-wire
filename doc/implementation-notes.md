# Resistance in a Wire - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description model.md

The whole model is basically one equation. Changing different variables will manipulate the equation.

## View

The `FormulaView` is a large piece of the view. It displays the main resistance equation, and will adjust the size of 
the variable letters based on the other values in the equation.

The `WireView` is a visualization of the formula. It is similar to the `FormulaView` in that the wire and its properties 
(length, area, resistivity) are manually updated when the variables change.
 
With the `SlidersBox` control sliders, you can adjust any of the variables in the equation except the resistance itself.
This will automatically adjust the view representations (`FormulaView` and `WireView`) of the equation.
