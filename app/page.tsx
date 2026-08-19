import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EditBridge | Ultra-High-Resolution Image Editing",
  description: "EditBridge is a faithful and efficient diffusion bridge framework for image editing at resolutions up to 4K.",
};

const authors = [
  ["Jiayi Song", "1,2"], ["Shijie Huang", "2"], ["Fangtai Wu", "2"], ["Yubo Huang", "2"],
  ["Zhenxiong Tan", "3"], ["Songhua Liu", "1,*"], ["Jiaming Liu", "2,†"], ["Ruihua Huang", "2"],
];

function Figure({ src, alt, caption, narrow = false }: { src: string; alt: string; caption: string; narrow?: boolean }) {
  return (
    <figure className={`paper-figure${narrow ? " paper-figure--narrow" : ""}`}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Project page navigation">
        <a className="nav__brand" href="#top" aria-label="EditBridge home"><span className="nav__mark">E</span><span>EditBridge</span></a>
        <div className="nav__links"><a href="#abstract">Abstract</a><a href="#method">Method</a><a href="#results">Results</a><a href="#analysis">Analysis</a></div>
      </nav>

      <header className="hero" id="top">
        <div className="hero__glow hero__glow--one" /><div className="hero__glow hero__glow--two" />
        <p className="kicker">Project page · August 2026</p>
        <div className="hero__title">
          <p className="hero__name">EditBridge</p>
          <h1>
            <span>Towards Faithful and Efficient</span>
            <span>Ultra-High-Resolution Image Editing</span>
          </h1>
        </div>
        <div className="authors" aria-label="Authors">
          {authors.map(([name, affiliation]) => <span key={name}>{name}<sup>{affiliation}</sup></span>)}
        </div>
        <p className="affiliations">
          <span><sup>1</sup>School of Artificial Intelligence, Shanghai Jiao Tong University</span>
          <span><sup>2</sup>Qwen Business Unit of Alibaba</span>
          <span><sup>3</sup>National University of Singapore</span>
        </p>
        <p className="affiliations affiliations--contact"><a href="mailto:liusonghua@sjtu.edu.cn">liusonghua@sjtu.edu.cn</a></p>
        <div className="hero__actions">
          <a className="button button--primary" href="https://arxiv.org/abs/2608.18063" target="_blank" rel="noreferrer">Read paper <span aria-hidden="true">↗</span></a>
          <a className="button button--ghost" href="https://github.com/songyangyifei/editbridge" target="_blank" rel="noreferrer">Code <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero__stats" aria-label="Key results">
          <div><strong>4K</strong><span>editing resolution</span></div><div><strong>61.1s</strong><span>4K inference</span></div>
          <div><strong>3.6–8.4×</strong><span>2K speedup</span></div><div><strong>1 step</strong><span>bridge refinement</span></div>
        </div>
      </header>

      <section className="section section--intro" id="abstract">
        <div className="section__heading"><p className="eyebrow">Why EditBridge</p><h2>High-resolution editing without losing the source.</h2></div>
        <div className="intro-grid">
          <article>
            <p className="intro-label">Challenge</p>
            <p>Existing diffusion editors are usually limited to sub-1K outputs. A low-resolution edit followed by independent super-resolution can hallucinate details or damage texture because the original high-resolution source is no longer available to guide refinement.</p>
          </article>
          <article>
            <p className="intro-label">Our approach</p>
            <p>EditBridge reframes refinement as a structured data-to-data diffusion bridge from the low-resolution edited result to its high-resolution counterpart. The original high-resolution image remains an explicit condition, while prior-guided block-wise sparse attention preserves aligned details without the cost of dense global attention.</p>
          </article>
        </div>
        <Figure src="./assets/motivation.png" alt="Traditional diffusion and EditBridge pipelines, with examples of hallucinated details and texture preservation." caption="Motivation. EditBridge conditions refinement on the original HR source, preventing information divergence and texture degradation." />
      </section>

      <section className="section" id="method">
        <div className="section__heading section__heading--split">
          <div><p className="eyebrow">Method</p><h2>A bridge from coarse edits to faithful 4K results.</h2></div>
          <p>A diffusion bridge transports the upsampled LR edit toward the HR target. Correspondence priors from the first-stage editor route each target chunk to semantically aligned source blocks.</p>
        </div>
        <Figure src="./assets/method.png" alt="EditBridge framework with diffusion bridge refinement, correspondence prior, and block-wise sparse attention." caption="Overview of EditBridge. PG-BSA combines intra-domain self-attention with prior-guided cross-chunk sparse attention." />
        <div className="method-cards">
          <article><span>01</span><h3>Coarse edit</h3><p>A pretrained editor first produces an instruction-aligned result at its native resolution.</p></article>
          <article><span>02</span><h3>Diffusion bridge</h3><p>The upsampled edit becomes a structured starting point instead of regenerating the image from noise.</p></article>
          <article><span>03</span><h3>Sparse HR guidance</h3><p>Semantic correspondence selects only the source blocks needed to recover faithful high-frequency detail.</p></article>
        </div>
      </section>

      <section className="section section--tinted" id="results">
        <div className="section__heading section__heading--split">
          <div><p className="eyebrow">Results</p><h2>Sharper details, stronger fidelity, practical latency.</h2></div>
          <p>EditBridge consistently leads reconstruction and perceptual metrics from 1K through 4K while remaining substantially faster than direct inference and conventional diffusion-based super-resolution.</p>
        </div>
        <div className="result-stack">
          <Figure src="./assets/qualitative-1k.png" alt="Qualitative 1K comparison across EditBridge and baseline super-resolution methods." caption="Qualitative comparison at 1K. Ours recovers fine details while remaining faithful to the HR source." />
          <Figure src="./assets/qualitative-2k.png" alt="Qualitative 2K comparison across EditBridge and baseline super-resolution methods." caption="Qualitative comparison at 2K. EditBridge preserves text, object structure, and local texture." />
        </div>
      </section>

      <section className="section" id="analysis">
        <div className="section__heading"><p className="eyebrow">Analysis</p><h2>One step is enough.</h2></div>
        <div className="analysis-grid">
          <Figure src="./assets/attention-ablation.png" alt="Visual comparison between full attention and EditBridge sparse attention." caption="Attention sparsity. Full attention introduces source-induced artifacts; PG-BSA preserves alignment." />
          <Figure src="./assets/steps-ablation.png" alt="Comparison of one, five, and ten bridge inference steps." caption="Sampling steps. Single-step inference gives the best fidelity–efficiency balance." />
        </div>
      </section>

      <footer><div><span className="footer__brand">EditBridge</span><p>Towards Faithful and Efficient Ultra-High-Resolution Image Editing.</p></div><p>Project page · 2026</p></footer>
    </main>
  );
}
