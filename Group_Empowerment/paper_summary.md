# Paper Summary: Emergence of Social Behaviors Through Individual Empowerment

**Venue**: CoLLAs 2025 (Conference on Lifelong Learning Agents)
**Status**: Submission draft (anonymous, `\collasfinalcopy` commented out)

---

## Core Question

When multiple agents each pursue only their own intrinsic motivation (no explicit coordination, no shared objective), what collective behaviors emerge? And how does behavior change when an agent redirects that motivation toward helping another?

## Key Concept: Empowerment

Empowerment = channel capacity between an agent's actions and its future states. It measures how many distinct futures an agent can reach — raw optionality, without preferring any particular outcome.

- **Egoistic** agent: maximizes its own empowerment
- **Altruistic** agent: maximizes another agent's empowerment

This makes empowerment a clean substrate for studying how the *direction* of intrinsic motivation shapes collective behavior, decoupled from any task or reward.

## Technical Approach

### Single-Agent Baseline (from Tiomkin et al. 2024)

1. Linearize nonlinear dynamics around a zero-control trajectory
2. Assume Gaussian probing policy
3. Add observation noise for finite channel capacity
4. Solve via water-filling algorithm for power-constrained linear-Gaussian channels

Result: maximize log-det of future state covariance subject to a trace (power) constraint on the action covariance.

### Multi-Agent Extension (this paper's main contribution)

The coupled multi-agent dynamics are modeled as a **multi-user interference channel** (Carleial 1978):

- Each agent's action sequence = transmitted signal
- Each agent's own future state = its receiver
- Other agents' actions = structured interference noise (via off-diagonal blocks in the joint Jacobian)

The full block Jacobian **F_t** has blocks F_t^{(n,m)} = d(x_t^{(n)}) / d(u_{0:t-1}^{(m)}):
- Diagonal blocks: agent's direct control channel
- Off-diagonal blocks: cross-agent interference

**Iterative Water-Filling (IWF)** (Yu et al. 2004) solves this:
1. Each agent treats others' current strategies as fixed noise
2. Solves its own single-user water-filling problem
3. Iterates until convergence to Nash equilibrium

Convergence guaranteed under conditions from Wang 2025.

### Control Policies

Once empowerment is computed via IWF, actions are derived by one-step greedy optimization:
- **Egoistic**: agent n picks action maximizing its own empowerment at next state
- **Altruistic**: agent n picks action maximizing agent m's empowerment at next state

In both cases, other agents' actions are assumed zero during the maximization.

## How the Pieces Fit Together

```
Multi-agent coupled dynamics
        |
        v
Linearize around zero-control trajectory --> Block Jacobian F_t
        |
        v
Decompose into interference channel (diagonal = signal, off-diagonal = interference)
        |
        v
Iterative Water-Filling --> Nash equilibrium probing covariances --> Empowerment values
        |
        v
Greedy policy (egoistic or altruistic) --> select action --> step dynamics --> repeat
```

## Experiments

### 1. Linked Pendulums (N=2, small-scale, mechanically coupled)

Two pendulums connected by an elastic tendon. Each agent controls its own hinge torque.

**Egoistic results** (heatmaps over torque space):
- **Asymmetric torques**: stronger agent dominates — reaches upright, constrains weaker agent through tendon. Produces dominance hierarchies.
- **Comparable torques**: cooperative regime — both reach upright simultaneously. Both get high (but not maximal) empowerment.
- Neither agent can self-right below ~0.5 torque under egoistic policy.

**Mixed egoistic/altruistic results**:
- Left agent egoistic, right agent altruistic (helping left)
- Left agent reaches upright across a much larger region of torque space
- Increasing altruistic agent's torque expands the conditions under which the weaker agent succeeds
- Qualitatively reshapes the reachable outcome landscape

**Planning horizon effect** (Appendix):
- Short horizon (0.75s): cooperation is common — both agents easily reach upright together
- Medium horizon (1.25s): cooperation zone shrinks but persists at similar strengths
- Long horizon (1.50s): cooperation nearly disappears — only the strongest agent wins

### 2. Vicsek Flock (N=125-150, large-scale, spatially distributed)

Agents move at constant speed, control angular acceleration. Passive dynamics bias toward local neighbor alignment (standard Vicsek model from Ferretti et al. 2022).

**Passive dynamics** (no empowerment control):
- Empowerment steadily decreases over time
- Order parameter approaches 1 (global alignment / consensus)

**Egoistic empowerment**:
- Average empowerment stays high
- Order parameter stays near zero (no consensus)
- But low order ≠ no structure: agents self-organize into coherent spatial patterns
- Heading distribution becomes **bimodal** — two opposing preferred directions
- Agents form band/stripe structures wrapping around the periodic domain
- Empowerment-seeking agents resist the loss of individual directional freedom

## Relation to Prior Work

| Work | Relationship |
|------|-------------|
| **Tiomkin et al. 2024** (PRX Life) | Foundation: single-agent linear-Gaussian empowerment. This paper extends it to multi-agent. |
| **Carleial 1978** | Interference channel model from information theory — provides the conceptual framework for treating multi-agent coupling. |
| **Yu et al. 2004** | Iterative water-filling algorithm — the computational engine for solving the multi-agent empowerment problem. |
| **Wang 2025** | Convergence guarantees for IWF under various update schemes. |
| **Charlesworth & Turner 2019** (PNAS) | Future State Maximization (FSM) in flocks — related objective (maximize reachable states). Key differences: FSM uses explicit state counting + neural network approximation; this paper uses principled information-theoretic channel capacity. Both produce collective motion from intrinsic motivation. |
| **Ferretti et al. 2022** | Provides the Vicsek flock dynamics model used in experiments. |

## Paper Status / Incomplete Sections

- **Section 2.3** ("Social Influence as Intrinsic Motivation"): marked `{\color{red} SECTION UNDER DEVELOPMENT}` — contains bullet-point notes only
- **Section 3** (Method intro): has a `{\color{red} SECTION UNDER DEVELOPMENT}` block with bullet points before the actual method text
- **Section 5** (Discussion): only two bullet points (scaling difficulty, differentiating through IWF)
- **Figure 6b** caption: marked `{\color{red} PLACEHOLDER FIG}` for the altruistic heatmap
- Various commented-out blocks with earlier drafts and notes from collaborators
- Author names are placeholders (anonymous submission)

## Key Takeaways

1. Empowerment alone (no explicit social objectives) is sufficient to produce non-trivial collective structure.
2. The character of emergent behavior depends sensitively on agents' relative capabilities and coupling.
3. The interference channel formulation provides a principled, tractable bridge from single-agent to multi-agent empowerment.
4. Altruism (maximizing another's empowerment) qualitatively reshapes what outcomes are reachable.
5. In large-scale systems, egoistic empowerment produces structured non-consensus states (bimodal headings, spatial bands) rather than either random disorder or full alignment.
