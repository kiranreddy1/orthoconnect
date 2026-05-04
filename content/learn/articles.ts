export interface Article {
  slug: string;
  title: string;
  summary: string;
  estimatedReadingTime: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'knee-pain-overview',
    title: 'Knee pain in young athletes: a starting framework',
    summary:
      'Where the pain is, when it started, and what makes it worse — three questions that organize most knee pain in athletes under 18.',
    estimatedReadingTime: '4 min read',
    body: [
      "Knee pain in young athletes is one of the most common reasons for a visit to a sports medicine clinic. The good news: most of the time, it is not a serious injury. The framework below will not tell you what is wrong, but it will help you describe what you are feeling more clearly.",
      "**Where is the pain?** Pain on the front of the knee — especially just below the kneecap — has a different set of common causes than pain on the inner side, the outer side, or the back of the knee. Pain that is hard to localize (\"all around\") is often more diffuse irritation; pain that feels like a single point is often more structural.",
      "**When did it start?** A sudden moment of injury (a twist, a hit, a hyperextension) suggests something different from pain that built up over weeks. Sudden onset with a pop and rapid swelling deserves an in-person evaluation soon. Gradual onset that worsens with running and jumping is the classic picture for overuse patterns.",
      "**What makes it better or worse?** Pain that is worst during activity and eases with rest tends to be a load issue. Pain that wakes you from sleep, or pain that is present even at rest, is more concerning and should be evaluated.",
      "Two patterns specifically worth knowing about in growing athletes: Osgood-Schlatter (anterior knee pain just below the kneecap, often in athletes 10–14 who jump or sprint a lot) and patellar tendon overuse (jumper's knee). Both usually respond to a temporary load reduction and a structured return to play. Neither is something you should try to push through.",
      "If anything in your situation feels off — your knee gives way, you cannot bear weight, you have rapid swelling — stop the activity and see someone. The cost of an unnecessary visit is small. The cost of pushing through a structural injury is large.",
    ],
  },
  {
    slug: 'growth-plate-basics',
    title: 'Growth plates: what they are and why they matter',
    summary:
      'Skeletally immature athletes have biology that adult athletes do not. Here is the short version.',
    estimatedReadingTime: '3 min read',
    body: [
      "A growth plate is the layer of cartilage near the ends of long bones where new bone is added during growth. Growth plates start to close in late adolescence and are typically fully closed by the early 20s. While they are open, they are biologically distinct from the surrounding bone, and they handle stress differently.",
      "There are two types of growth plate that matter for sports injuries:",
      "**Physes** — the growth plates at the ends of long bones (near joints). These are responsible for length growth and are vulnerable to fractures, especially after acute injuries. The Salter-Harris classification describes the patterns these fractures can take. A growth-plate fracture in a young athlete can look superficially like an ankle sprain or a wrist sprain, which is why we recommend that any acute joint injury in someone under 16 gets a closer look than the same injury in an adult.",
      "**Apophyses** — sites where tendons attach to bone (different from physes). These can become irritated when a tendon is repeatedly loaded faster than the apophysis can handle. Common examples: Osgood-Schlatter at the tibial tubercle (anterior knee), Sever's at the calcaneus (heel), Little League elbow at the medial epicondyle.",
      "Apophysitis (irritation of an apophysis) is usually self-limiting — the pattern resolves as growth completes. The treatment is patience, load reduction, and sometimes physical therapy. It does not usually require imaging or aggressive treatment.",
      "The reason OrthoConnect weights growth-plate-aware patterns higher in its scoring is not because these injuries are catastrophic — most are not. It is because they deserve a slightly earlier conversation with a clinician than the same symptoms would in an adult, and because they are easy to miss if you are thinking only in adult terms.",
    ],
  },
  {
    slug: 'rice-vs-peace-and-love',
    title: 'RICE vs. PEACE & LOVE: how injury aftercare evolved',
    summary:
      "What you learned in PE class isn't quite right anymore. Here is the updated approach.",
    estimatedReadingTime: '3 min read',
    body: [
      "For decades the standard advice for an acute soft-tissue injury was RICE: Rest, Ice, Compression, Elevation. RICE is still useful in the first 24–48 hours, but the field has evolved. Two newer protocols — PEACE and LOVE, introduced by Dubois and Esculier in 2019 — describe a more nuanced approach for the days and weeks after the initial event.",
      "**PEACE (the first day or two):**",
      "- **P**rotect the injured area; avoid activities that aggravate pain.",
      "- **E**levate the limb above the heart when possible.",
      "- **A**void anti-inflammatory medications and ice in some cases — there is now evidence that aggressive inflammation suppression early on may slow tissue healing in some injuries.",
      "- **C**ompress the area to reduce swelling.",
      "- **E**ducate yourself about the injury and avoid unnecessary passive treatments.",
      "**LOVE (after the first couple of days):**",
      "- **L**oad: progressively reintroduce normal activity. Tissue heals best with the right amount of stress.",
      "- **O**ptimism: psychological factors meaningfully affect recovery time.",
      "- **V**ascularization: cardio that doesn't aggravate the injury (e.g., swimming for a knee, cycling for an upper-body injury) helps healing.",
      "- **E**xercise: structured, progressive movement is the most evidence-supported intervention for return to play.",
      "The big practical change from RICE to PEACE & LOVE is the de-emphasis on prolonged rest and aggressive icing. Modern sports medicine views early gentle motion and progressive loading as the path back, not extended immobilization.",
      "All that said: this is general information, not a treatment plan for your specific situation. If something hurts more than you expect or is not improving on a sensible timeline, see someone.",
    ],
  },
  {
    slug: 'when-to-see-a-doctor',
    title: 'When to see a doctor: a practical checklist',
    summary:
      "If you check any of these, do not wait. The cost of a visit is low; the cost of waiting on a serious injury is high.",
    estimatedReadingTime: '2 min read',
    body: [
      "**Same day or urgent care:**",
      "- You cannot bear weight on the affected limb.",
      "- The joint feels unstable, gives way, or looks visibly out of place.",
      "- You have new numbness, tingling, or loss of sensation.",
      "- Significant swelling appeared within an hour of injury.",
      "- You heard or felt a \"pop\" at the moment of injury.",
      "- You have a fever along with joint pain.",
      "- The pain is severe enough to wake you from sleep.",
      "- The injury followed a high-energy mechanism (car crash, fall from height).",
      "**Within 1–2 weeks:**",
      "- Pain has not improved after 5–7 days of reduced activity.",
      "- You are modifying how you play, or you have stopped playing entirely.",
      "- The pattern is getting worse, not better.",
      "- You have a specific mechanical trigger (a particular motion always reproduces the pain).",
      "- The pain is interfering with sleep, school, or daily activities.",
      "**Eventually, even if it is mild:**",
      "- Symptoms have been around for more than a month, even if they are mild and stable.",
      "- Anything that worries you, your parent, or your coach.",
      "If you do not have a sports medicine doctor, the AMSSM (American Medical Society for Sports Medicine) maintains a public Find-a-Doctor directory at amssm.org. An athletic trainer at your school is also an excellent first point of contact and can usually help you decide whether you need a physician next.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
