app.post("/add-budget", async (req, res) => {
    try {
        const { monthlyBudget, yearlySavings } = req.body;
        if (!monthlyBudget || !yearlySavings) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBudget = new Budget({ monthlyBudget, yearlySavings });
        await newBudget.save();

        res.status(201).json({ message: "Budget added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
