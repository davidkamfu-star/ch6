/* Detailed, editable marking for Topic 09. Each entry matches TOPIC9_QUESTIONS by index. */
(function () {
  const marking = [
    {
      k: "Limiting reagent and concentration-time curve",
      why: "After mixing, flask B contains 0.10 mmol of Br<sub>2</sub> but 0.25 mmol of HCO<sub>2</sub>H. Br<sub>2</sub> is therefore the limiting reagent, so its concentration eventually falls to zero. As the reactants are consumed, their concentrations fall and the rate gradually decreases; the curve must be smooth rather than linear.",
      working: "n(Br<sub>2</sub>) = 0.05 × 2.0/1000 = 1.0 × 10<sup>−4</sup> mol; n(HCO<sub>2</sub>H) = 0.05 × 5.0/1000 = 2.5 × 10<sup>−4</sup> mol.",
      x: ["Graph A incorrectly leaves Br<sub>2</sub> unreacted.", "Graphs C and D imply a constant rate; reaction rate decreases as reactant concentrations decrease.", "Graph B reaches zero with a decreasing gradient and is the only suitable curve."],
      tip: "For a concentration-time graph, decide the final value from limiting-reagent stoichiometry before judging the curve shape."
    },
    {
      k: "Acid is limiting in the magnesium reaction",
      why: "The reaction is Mg + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>. There are 0.020 mol of HCl, so only 0.010 mol of Mg can react and 0.010 mol of H<sub>2</sub> can form. The hydrogen curve must rise rapidly at first, then level off smoothly at 0.010 mol.",
      working: "n(HCl) = 1.0 × 20.0/1000 = 0.020 mol; n(H<sub>2</sub>) = 0.020/2 = 0.010 mol.",
      x: ["A and B level off at 0.030 mol and ignore the 2:1 HCl-to-H<sub>2</sub> ratio.", "D has the right final amount but an unrealistic constant-rate straight line.", "C has both the correct final amount and the correct curved shape."],
      tip: "A rate graph tests two separate ideas: the initial gradient describes rate, while the plateau describes the limiting reagent."
    },
    {
      k: "Use concentration changes to obtain the mole ratio",
      why: "In a fixed-volume vessel, concentration changes are proportional to mole changes. The graph shows Q being consumed while P is formed, and the increase in [P] is twice the decrease in [Q]. The stoichiometric equation is therefore Q(g) → 2P(g).",
      x: ["Options A and C have P as the reactant, contrary to the direction of the graph.", "Option B gives a 1:1 change, but the graph shows twice as much P formed as Q consumed.", "Option D matches both the direction and the 1:2 ratio."],
      tip: "Compare Δ[product] : −Δ[reactant], not the absolute concentrations at one point."
    },
    {
      k: "Rate of formation includes the stoichiometric coefficient",
      why: "[X<sub>2</sub>] decreases by 0.06 mol dm<sup>−3</sup> in 4 minutes, so its average rate of disappearance is 0.015 mol dm<sup>−3</sup> min<sup>−1</sup>. Since each mole of X<sub>2</sub> forms two moles of X, X forms at twice that rate.",
      working: "Rate of disappearance of X<sub>2</sub> = (0.10 − 0.04)/4 = 0.015 mol dm<sup>−3</sup> min<sup>−1</sup>; rate of formation of X = 2(0.015) = 0.030 mol dm<sup>−3</sup> min<sup>−1</sup>.",
      x: ["0.015 is the disappearance rate of X<sub>2</sub>, not the formation rate of X.", "The coefficient 2 must be applied once; it gives 0.030, not 0.020.", "Therefore D is correct."],
      tip: "Write the balanced equation beside the rate calculation and apply the coefficient ratio at the final step."
    },
    {
      k: "A gas syringe follows gas production",
      why: "The apparatus measures the volume of gas evolved. Magnesium and hydrochloric acid produce hydrogen gas, so Reaction (2) can be followed. Zinc hydroxide neutralisation produces no gas, while the chlorine–bromide reaction changes colour but does not produce a gas for collection.",
      x: ["(1) forms salt and water only.", "(2) forms H<sub>2</sub>(g), so the syringe reading changes continuously.", "(3) is better followed by colour intensity, not gas volume."],
      tip: "Match the apparatus reading to a quantity that changes continuously during the reaction."
    },
    {
      k: "The disappearing-cross method requires increasing turbidity",
      why: "Sodium thiosulfate and hydrochloric acid form solid sulfur. As sulfur accumulates, the mixture becomes increasingly turbid until the cross can no longer be seen. The other reactions do not produce the required suspended solid under this set-up.",
      x: ["A forms a precipitate, but the usual acid–thiosulfate cross experiment is represented by D and gives a progressive, measurable cloudiness.", "B and C mainly produce gases, which should be monitored by gas volume, pressure or mass loss.", "D directly links sulfur formation to the visibility end point."],
      tip: "For a cross experiment, look for formation of a suspended solid rather than gas evolution alone."
    },
    {
      k: "Colorimetry needs a coloured species whose concentration changes",
      why: "Reaction (1) consumes purple MnO<sub>4</sub><sup>−</sup>, and Reaction (3) consumes coloured Br<sub>2</sub>(aq), so their colour intensity changes with progress. All principal species in Reaction (2) are colourless, so colorimetry is unsuitable.",
      x: ["(1) is suitable because permanganate absorbance decreases.", "(2) is not suitable because no coloured species changes concentration.", "(3) is suitable because bromine colour fades."],
      tip: "Name the coloured reactant or product; do not choose colorimetry merely because a reaction occurs in solution."
    },
    {
      k: "Two independent observables change",
      why: "CO<sub>2</sub>(g) is formed, so gas volume increases. Br<sub>2</sub>(aq) is coloured and is consumed, so colour intensity decreases. No suspended solid is formed, so the mixture does not become turbid.",
      x: ["Statement (1) is correct: collect CO<sub>2</sub>.", "Statement (2) is incorrect: all products remain dissolved or gaseous.", "Statement (3) is correct: follow the fading bromine colour."],
      tip: "Check each proposed measurement against a specific reactant or product in the equation."
    },
    {
      k: "Follow acid consumption and bromine formation",
      why: "HCl is consumed, so the pH rises as the reaction proceeds. Brown Br<sub>2</sub>(aq) forms from colourless reactants, so colour intensity increases. No gas is produced, so the system pressure is not a suitable progress variable.",
      x: ["Statement (1) is correct because [H<sup>+</sup>] changes.", "Statement (2) is incorrect because the reaction produces no gas.", "Statement (3) is correct because Br<sub>2</sub>(aq) is coloured."],
      tip: "For pH monitoring, confirm that H<sup>+</sup> or OH<sup>−</sup> is consumed or produced."
    },
    {
      k: "Gas pressure and colour both track the reaction",
      why: "CO<sub>2</sub>(g) is formed, so pressure increases in a closed constant-volume system. Purple MnO<sub>4</sub><sup>−</sup> is consumed, so colour intensity decreases. The mass of water formed cannot be measured separately in the aqueous reaction mixture.",
      x: ["Statement (1) is not a practical independent measurement.", "Statement (2) is suitable because gaseous CO<sub>2</sub> accumulates.", "Statement (3) is suitable because permanganate colour fades."],
      tip: "A valid progress variable must be measurable without separating a component from the reacting mixture."
    },
    {
      k: "The set-up needs a visible solid change",
      why: "The cross method can time the disappearance of opaque MgO in Reaction (1) or the appearance of sulfur turbidity in Reaction (2) while concentration is varied. Reaction (3) deposits zinc on magnesium but does not provide a clear disappearing-cross end point.",
      x: ["Reaction (1) can be timed until the solid disappears and the cross becomes visible.", "Reaction (2) can be timed until sulfur hides the cross.", "Reaction (3) requires another method, such as mass change or chemical analysis."],
      tip: "Before varying concentration, confirm that the chosen apparatus gives the same reproducible end point in every trial."
    },
    {
      k: "Compare trials while keeping total volume constant",
      why: "All mixtures have the same total volume, so changing a solution volume changes its initial concentration proportionally. Doubling B from Trial 1 to Trial 2 halves the time, so the rate increases with [B]. Doubling A from Trial 1 to Trial 3 leaves the time unchanged, so the rate does not increase with [A].",
      working: "Relative rate ∝ 1/time. Trial 2 is twice as fast as Trial 1; Trial 3 has the same rate as Trial 1.",
      x: ["A is false because changing [A] produced no rate change.", "B reverses the experimental conclusion.", "C states the observed dependence correctly; D ignores the effect of B."],
      tip: "Use 1/t as the relative rate for a fixed turbidity end point, and compare only trials that isolate one variable."
    },
    {
      k: "Initial rate depends on concentration, not total solution volume",
      why: "With the same zinc granules and temperature, 200 cm<sup>3</sup> of 1.0 M HCl provides the same initial [H<sup>+</sup>] at the zinc surface as the original solution, so the initial rate is unchanged. The larger total amount of acid affects duration or final amount only if limiting.",
      x: ["2.0 M HCl gives a higher initial rate.", "1.0 M H<sub>2</sub>SO<sub>4</sub> supplies a higher effective [H<sup>+</sup>] than 1.0 M HCl.", "1.0 M CH<sub>3</sub>COOH is weak and has a much lower [H<sup>+</sup>].", "Only B keeps the relevant initial concentration unchanged."],
      tip: "Separate concentration, which controls initial collision frequency, from volume, which controls the total amount available."
    },
    {
      k: "Highest bromine concentration gives the fastest initial rate",
      why: "The total bromine-mixture volume is 5.0 cm<sup>3</sup> in every flask, but the proportion of 0.05 M Br<sub>2</sub> increases from A to D. HCO<sub>2</sub>H concentration and all other conditions are the same, and the rate depends on both reactant concentrations. Flask D therefore has the fastest initial rate.",
      x: ["A, B and C contain progressively less Br<sub>2</sub> than D.", "Dilution with water lowers [Br<sub>2</sub>] and collision frequency.", "D has the largest [Br<sub>2</sub>] after mixing."],
      tip: "When stock solution plus water has a fixed total volume, rank concentration by the volume of stock solution used."
    },
    {
      k: "Surface area changes rate but not yield",
      why: "Granules have a smaller total surface area than the same mass of powder, so fewer acid particles collide with CaCO<sub>3</sub> per second and the curve has a smaller initial gradient. The mass of CaCO<sub>3</sub> is unchanged and HCl is in excess, so the same final volume of CO<sub>2</sub> is produced.",
      x: ["A assumes a constant rate.", "B and C are faster than, rather than slower than, the original powder reaction.", "D rises more slowly but reaches the same plateau."],
      tip: "Particle size changes the time to reach the plateau, not the plateau itself, when the reacting amount is unchanged."
    },
    {
      k: "Equal moles give equal yield; higher concentration gives higher rate",
      why: "Both experiments contain 0.025 mol of H<sub>2</sub>O<sub>2</sub>, so they produce the same final amount of O<sub>2</sub>. Experiment I has the higher H<sub>2</sub>O<sub>2</sub> concentration, so it has the greater initial rate and reaches the common plateau sooner.",
      working: "I: 1.0 × 0.025 = 0.025 mol; II: 0.5 × 0.050 = 0.025 mol.",
      x: ["A wrongly makes dilute Experiment II faster.", "C and D wrongly give different final amounts.", "B shows I initially steeper and both experiments reaching the same plateau."],
      tip: "Calculate cV before reading the graph: moles set the plateau; concentration sets the initial gradient."
    },
    {
      k: "Combine surface area and hydrogen-ion concentration",
      why: "Zinc powder exposes more surface area than granules. At the same stated molarity, sulfuric acid supplies a higher concentration of H<sup>+</sup> than hydrochloric acid for this comparison. Option D combines powder with sulfuric acid, so it gives the greatest frequency of effective collisions and the highest gas-formation rate.",
      x: ["A has powder but the lower effective [H<sup>+</sup>].", "B has both granules and hydrochloric acid.", "C has sulfuric acid but the smaller granule surface area.", "D combines both rate-increasing factors."],
      tip: "Rank each independent rate factor, then choose the option that combines the strongest effects."
    },
    {
      k: "Concentration controls initial rate; moles control total gas",
      why: "Experiment (1) starts with the higher H<sub>2</sub>O<sub>2</sub> concentration, so O<sub>2</sub> forms faster initially. Both experiments contain 0.100 mol of H<sub>2</sub>O<sub>2</sub>, so complete decomposition gives the same total volume of O<sub>2</sub>.",
      working: "Experiment (1): 2.0 × 0.050 = 0.100 mol; Experiment (2): 1.0 × 0.100 = 0.100 mol.",
      x: ["The initial rates are not equal because the concentrations differ.", "The final volumes are equal because the reactant amounts are equal.", "Combination A states both conclusions correctly."],
      tip: "Do not infer yield from concentration alone; always compare the number of moles."
    },
    {
      k: "Strong and weak acids can give the same yield but different rates",
      why: "The 1.0 g Na<sub>2</sub>CO<sub>3</sub> sample is limiting in both reactions, so both produce the same amount of CO<sub>2</sub> and the same mass decrease. HCl is a strong acid and gives a higher initial [H<sup>+</sup>] than 1.0 M ethanoic acid, so Reaction (I) is faster. The heat released is not the same because the weak acid must ionise during reaction.",
      x: ["Statement (1) is true: the same limiting carbonate gives the same CO<sub>2</sub> amount.", "Statement (2) is true: HCl provides the higher initial [H<sup>+</sup>].", "Statement (3) is false: acid strength and ionisation affect the enthalpy change."],
      tip: "For acid comparisons, treat rate, final amount and heat change as three separate questions."
    },
    {
      k: "Acid strength, surface area and catalysts all affect rate",
      why: "HCl is fully ionised and provides more H<sup>+</sup> than 1 M ethanoic acid, so MgO dissolves faster. Powdered marble has a larger surface area than granules. MnO<sub>2</sub> provides an alternative pathway of lower activation energy for H<sub>2</sub>O<sub>2</sub> decomposition. All three statements are correct.",
      x: ["(1) tests acid strength at equal molarity.", "(2) tests exposed surface area.", "(3) tests catalysis and activation energy.", "Only D includes all three correct statements."],
      tip: "State the particle-level reason: more frequent effective collisions or a larger fraction of collisions overcoming activation energy."
    },
    {
      k: "A faster curve with a lower plateau needs two simultaneous changes",
      why: "Curve B has a steeper initial gradient but a lower final hydrogen volume than curve A. Using 50 cm<sup>3</sup> of 1.50 M HCl raises the concentration and hence the initial rate, but supplies only 0.075 mol HCl instead of 0.100 mol, so less H<sub>2</sub> is formed.",
      working: "Original HCl = 1.00 × 0.100 = 0.100 mol; option D HCl = 1.50 × 0.050 = 0.075 mol.",
      x: ["Higher temperature or zinc powder would increase rate but leave the final gas volume unchanged.", "200 cm<sup>3</sup> of 0.80 M HCl gives more acid and cannot produce the lower plateau shown.", "D alone gives both a higher initial rate and a smaller final amount."],
      tip: "Read gradient and plateau independently, then find the option that explains both."
    },
    {
      k: "Granules slow the reaction without changing the final mass loss",
      why: "Curve Y has a smaller gradient but reaches the same final decrease in mass as curve X. Replacing powder with the same mass of granules reduces surface area and slows CO<sub>2</sub> production, but the amount of CaCO<sub>3</sub> and acid is unchanged, so the final CO<sub>2</sub> amount is unchanged.",
      x: ["Higher temperature would make the curve steeper, not shallower.", "Halving acid volume or concentration would reduce both rate and final mass loss.", "Granules change only surface area, matching curve Y."],
      tip: "A same-height plateau signals the same limiting amount even when the reaction time changes."
    },
    {
      k: "Higher concentration raises collision frequency, not collision energy",
      why: "Increasing [SO<sub>2</sub>] puts more SO<sub>2</sub> particles in each unit volume, so collisions occur more frequently and the reaction rate increases. Temperature is constant, so the particles do not have more kinetic energy on average.",
      x: ["A incorrectly claims greater average collision energy.", "B correctly pairs increased rate with increased collision frequency.", "C and D incorrectly claim that the rate is unchanged."],
      tip: "Concentration changes collision frequency; temperature changes both frequency and the energy distribution."
    },
    {
      k: "A catalyst is not consumed",
      why: "MnO<sub>2</sub> is a catalyst, so it is regenerated and its net consumption does not depend on H<sub>2</sub>O<sub>2</sub> concentration. Lowering the concentration lowers the initial rate. With the same solution volume, it also halves the moles of H<sub>2</sub>O<sub>2</sub>, so less O<sub>2</sub> is formed.",
      x: ["Statement (1) is false because a catalyst is not consumed overall.", "Statement (2) is true because effective collisions occur less frequently.", "Statement (3) is true because fewer moles of reactant are present.", "Therefore D is correct."],
      tip: "Never treat a catalyst written over the arrow as a stoichiometric reactant."
    },
    {
      k: "Yeast supplies enzymes that catalyse fermentation",
      why: "Enzymes in yeast provide lower-activation-energy pathways for converting glucose to ethanol. Adding yeast therefore increases the conversion rate. Both statements are true, and the second directly explains the first.",
      x: ["A is correct because the enzyme-catalysis statement explains the observed rate increase.", "B would require the two truths to be unrelated, which they are not.", "C and D incorrectly reject the first statement."],
      tip: "In assertion–reason questions, judge each statement first, then test the causal link."
    },
    {
      k: "Aqueous precipitation is effectively instantaneous",
      why: "Ag<sup>+</sup>(aq) and Cl<sup>−</sup>(aq) combine immediately when the two solutions mix, so AgCl precipitation is the fastest reaction listed. Zinc with acid is slower at a solid surface, rusting is slow, and methane bromination needs a photochemical chain process.",
      x: ["A is a rapid ionic precipitation reaction in homogeneous solution.", "B is limited by reactions at the zinc surface.", "C is slow corrosion involving several steps.", "D requires light initiation and is slower under ordinary room conditions."],
      tip: "Among room-condition reactions, soluble-ion precipitation and neutralisation are usually much faster than solid-surface or covalent reactions."
    },
    {
      k: "Convert product mass to gas volume through the mole ratio",
      why: "First find moles of Fe, then use 4 mol H<sub>2</sub> for every 3 mol Fe. Converting the required H<sub>2</sub> amount with 24 dm<sup>3</sup> mol<sup>−1</sup> gives approximately 0.096 dm<sup>3</sup>, or 96 cm<sup>3</sup>.",
      working: "n(Fe) = 0.168/55.8 = 3.01 × 10<sup>−3</sup> mol; n(H<sub>2</sub>) = (4/3)(3.01 × 10<sup>−3</sup>) = 4.01 × 10<sup>−3</sup> mol; V = 4.01 × 10<sup>−3</sup> × 24 = 0.0963 dm<sup>3</sup> ≈ 96 cm<sup>3</sup>.",
      x: ["24 and 48 cm<sup>3</sup> under-apply the stoichiometric or unit conversion.", "96 cm<sup>3</sup> follows the 4:3 ratio.", "192 cm<sup>3</sup> doubles the required amount."],
      tip: "Keep gas volume in dm<sup>3</sup> until the last line, then multiply by 1000 for cm<sup>3</sup>."
    },
    {
      k: "Gas moles, equation ratio, then solution volume",
      why: "480 cm<sup>3</sup> is 0.480 dm<sup>3</sup>, corresponding to 0.020 mol N<sub>2</sub>O<sub>4</sub>. The equation requires twice as many moles of NaOH, namely 0.040 mol. At 0.5 M, this requires 0.080 dm<sup>3</sup> or 80 cm<sup>3</sup>.",
      working: "n(N<sub>2</sub>O<sub>4</sub>) = 0.480/24 = 0.020 mol; n(NaOH) = 2(0.020) = 0.040 mol; V = n/c = 0.040/0.5 = 0.080 dm<sup>3</sup> = 80 cm<sup>3</sup>.",
      x: ["8 and 40 cm<sup>3</sup> omit a factor of ten or the 2:1 ratio.", "12.5 cm<sup>3</sup> incorrectly rearranges c = n/V.", "80 cm<sup>3</sup> is the minimum stoichiometric volume."],
      tip: "Write every volume in dm<sup>3</sup> before using molarity or molar gas volume."
    },
    {
      k: "Carbonate is limiting",
      why: "Na<sub>2</sub>CO<sub>3</sub> has molar mass 106 g mol<sup>−1</sup>, so 1.2 g is 0.0113 mol. It needs 0.0226 mol HNO<sub>3</sub>, while 0.050 mol is available; acid is in excess. The carbonate therefore forms 0.0113 mol CO<sub>2</sub>, equal to about 272 cm<sup>3</sup> at room conditions.",
      working: "n(Na<sub>2</sub>CO<sub>3</sub>) = 1.2/106 = 0.01132 mol; n(HNO<sub>3</sub>) = 1.0 × 0.050 = 0.050 mol; V(CO<sub>2</sub>) = 0.01132 × 24 × 1000 = 272 cm<sup>3</sup>.",
      x: ["544 cm<sup>3</sup> incorrectly doubles CO<sub>2</sub> as well as the acid coefficient.", "600 and 1200 cm<sup>3</sup> treat the excess acid as limiting.", "272 cm<sup>3</sup> follows the 1:1 carbonate-to-CO<sub>2</sub> ratio."],
      tip: "Determine the limiting reagent before converting to gas volume."
    },
    {
      k: "Water condenses at room conditions",
      why: "100 cm<sup>3</sup> of propane consumes 500 cm<sup>3</sup> O<sub>2</sub>, leaving 100 cm<sup>3</sup> O<sub>2</sub>. It forms 300 cm<sup>3</sup> CO<sub>2</sub>. Water is liquid at room conditions and is not counted in the gaseous mixture, so the total gas volume is 400 cm<sup>3</sup>.",
      working: "Remaining O<sub>2</sub> = 600 − 5(100) = 100 cm<sup>3</sup>; CO<sub>2</sub> = 3(100) = 300 cm<sup>3</sup>; total gas = 100 + 300 = 400 cm<sup>3</sup>.",
      x: ["800 and 700 cm<sup>3</sup> count reactants or liquid water incorrectly.", "300 cm<sup>3</sup> omits the excess oxygen.", "400 cm<sup>3</sup> includes CO<sub>2</sub> and unreacted O<sub>2</sub> only."],
      tip: "After combustion, list which substances are gaseous at the stated final conditions."
    },
    {
      k: "Use gas-volume ratios for methane and ethane combustion",
      why: "Let the methane volume be x cm<sup>3</sup>; ethane is then 50 − x. Methane forms an equal volume of CO<sub>2</sub>, while ethane forms twice its volume. The total CO<sub>2</sub> equation gives x = 20 cm<sup>3</sup>.",
      working: "x + 2(50 − x) = 80; 100 − x = 80; x = 20 cm<sup>3</sup>.",
      x: ["The 1:1 CH<sub>4</sub>:CO<sub>2</sub> and 1:2 C<sub>2</sub>H<sub>6</sub>:CO<sub>2</sub> ratios must both be used.", "Substitution gives 20 cm<sup>3</sup> methane and 30 cm<sup>3</sup> ethane.", "Therefore B is correct."],
      tip: "At the same temperature and pressure, gaseous volume ratios equal equation mole ratios."
    },
    {
      k: "Equal gas amounts occupy equal volumes at the same conditions",
      why: "One mole of any ideal gas occupies the same volume at the same temperature and pressure, so 1 mol SO<sub>2</sub> and 1 mol N<sub>2</sub> have equal volumes; the first statement is false. One mole of SO<sub>2</sub> contains 3 mol of atoms, while one mole of N<sub>2</sub> contains 2 mol of atoms; the second statement is true.",
      x: ["A and B incorrectly accept the first statement.", "C correctly states that the first is false and the second true.", "D incorrectly rejects the atom-count statement."],
      tip: "Molar gas volume depends on temperature and pressure, not molecular mass or number of atoms per molecule."
    },
    {
      k: "Physical state matters when comparing molar volume",
      why: "At room temperature and pressure, fluorine is a gas but bromine is a liquid, so the stated comparison that bromine has the larger molar volume is false. A Br<sub>2</sub> molecule is larger than an F<sub>2</sub> molecule because bromine atoms have more occupied electron shells, so the second statement is true.",
      x: ["A and B incorrectly treat molecular size as determining molar volume across different physical states.", "C correctly identifies false then true.", "D incorrectly denies the molecular-size trend."],
      tip: "Check physical states before applying the equal-molar-volume rule for gases."
    },
    {
      k: "Reactivity controls rate; moles control hydrogen yield",
      why: "Calcium is more reactive than zinc, so powdered calcium reacts faster with HCl. Both CaCl<sub>2</sub> and ZnCl<sub>2</sub> are soluble, and HCl is in excess in both cases, so clear solutions remain. For equal masses, calcium has more moles because its molar mass is lower; both metals form H<sub>2</sub> in a 1:1 metal-to-hydrogen ratio, so calcium produces more gas.",
      working: "n(Ca) = 0.5/40.1 = 0.0125 mol; n(Zn) = 0.5/65.4 = 0.00765 mol. Each needs 2 mol HCl per mol metal, and 0.050 mol HCl is available in both reactions, so acid is excess.",
      x: ["Statement (1) is true from the reactivity series.", "Statement (2) is true because both chlorides are soluble and no excess solid remains when the metals are limiting.", "Statement (3) is true because the calcium sample contains more moles.", "All three are correct, so D is accepted."],
      tip: "For a rate-and-yield comparison, use the reactivity series for the initial rate and stoichiometry for the final gas amount."
    }
  ];

  if (!window.TOPIC9_QUESTIONS || window.TOPIC9_QUESTIONS.length !== marking.length) {
    throw new Error("Topic 09 detailed-marking data does not match the question bank.");
  }

  window.TOPIC9_QUESTIONS.forEach(function (question, index) {
    question.detailedMarking = marking[index];
  });
})();
