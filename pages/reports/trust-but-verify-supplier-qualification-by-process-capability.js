import Head from 'next/head';
import Link from 'next/link';

export default function TrustButVerify() {
  return (
    <>
      <Head>
        <title>Trust but Verify - Supplier Qualification by Process Capability | Boston Manufacturing Group</title>
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <div className="flex justify-center pt-10 pb-4 bg-background">
          <Link href="/reports">
            <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>
        <section className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-secondary mb-4">Trust but Verify - Supplier Qualification by Process Capability</h1>
          <div className="flex items-center gap-3 mb-2">
            <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-8 h-8 rounded-full object-cover border-2 border-secondary" />
            <p className="text-accent">Guy Breier, CEO, BMG &middot; Feb 8, 2021</p>
          </div>
          <p>Years back, I was in charge of supplier and manufacturing quality for one of the large US-based companies designing and selling complex electromechanical home products. One of these products was a sophisticated vacuum cleaner, and we were about to order a large production run, with components coming from different suppliers. One of these components was a drive belt that provided fine control over the vacuum nozzle-head. The belt was transferring power from an electric motor to the nozzle-head's brush-roll which was turning at high RPM. We decided to choose a new supplier that we haven't used before.</p>
          <p>From our early prototype testing and from similar products in our portfolio, we knew that a precise and accurate length of the drive belt was critical. If the belt was too long, the tension would be too low and the belt would slip. This in turn would lead to poor nozzle performance, a noisy operation, and premature wear and tear. The mechanics of this is simple: a belt that is too long will be loose, and can slip against the gear teeth and over time, this can degrade the belt to the point that it doesn't work at all. On the other hand, if the belt is too short, the tension would be too high causing too much stress on the gears. This too impacts long-term reliability, but also creates a high-pitch sound disturbing to the human ear.</p>
          <p>As part of the design package delivered to this supplier, detailed drawings were sent, which included the required belt length and tolerances. The belt specifications were 150mm with a tolerance of ±10mm. To ensure they were producing the belt to spec, and since it was a new supplier, I insisted that we obtain a <em>First Article Inspection</em> (FAI): they needed to show us the first 30 samples for evaluation.</p>
          <p>So they had sent us the samples, and the belts were within spec. We were ready to roll, right?</p>
          <p>Something seemed off, though, although no one else seemed to see it. I decided to look at the data more closely. I noticed that the FAI samples had a curious fact: all the samples were on the lower end of the specification limit. Strange. I decided to run a statistical analysis of the belt lengths of the samples they had sent. Thirty data points isn't a lot, but it is just enough to get some sense of the distribution of what could be expected from the supplier. (for normal distribution with continuous data 30 samples is the minimum required).</p>
          <p>There are two important parameters that describe a sample distribution: the variance (width) and the mean (average of the data they sent). If the mean is not close to the center of the spec tolerance range, in this case 150mm, even if it is a narrow distribution, it could still skew out of spec. The CPK is an index that is used for statistics that skew to one side of a tolerance range. It is a riff on the "process capability" index Cp which describes how narrow the distribution is. The extra K in CPK accounts for this - it comes from the Japanese word "katayori" which means offset. It modifies the CP-index to account for skewed data. A CPK of zero would be very bad! It would mean that the center of the distribution will actually be on one of the boundaries of the tolerated specs - so about half the output will be out of spec! (A negative CPK would be even worse.) On the other hand, a CPK of one would mean the distribution is within the boundaries of both sides, with the tail reaching the closest tolerance boundary at 3σ from the average of the sample set.</p>
          <img src="/trust-but-verify-photo.png" alt="Report illustration or figure from Trust but Verify report" className="w-full max-w-md mx-auto my-6 rounded shadow" />
          <article className="prose prose-blue max-w-none">
            <p>What was the CPK of the 30 samples in the FAI we received? I readily calculated from the data to be slightly more than 1/2 (see figure). This CPK, if reflected in the entire line of belts being produced, would indicate an 11% defect rate. In other words, a defective parts per million (DPPM) of about 110,000. This was enormous, and it didn't jive with the 30 samples they had produced for the First Article Inspection (FAI) we received. I immediately knew what was happening. They had almost certainly pulled all the samples that were out of range. About three of the samples FAI set were out of range, and they never sent them to us.</p>
            <p>A simple calculation shows that the probability of all thirty samples being in range is:</p>
            <p>So with a 97% likelihood, they had misrepresented their FAI, most likely because they pulled them out from the sample sent to us. We called them on this, and they adjusted the average length of the belt to be more centered. The production line ran with the new length belts (6 mm longer on average), and all was well.</p>
            <p>There were many lessons learned from this, but the most important one for me, that I have carried forward, is that it is mission critical to do more than make sure the initial samples are within specification. It's not sufficient, especially if you do not have someone you trust onsite collecting the FAI. I also understood clearly that my job is to use these analyses to catch problems before they happen at scale. When data speaks, we should listen. In this case, the samples needed to be representative, and if some are removed by hand, this can be detected using statistical strategies.</p>
          </article>
        </section>
        <div className="flex justify-center pb-12">
          <a href="/" className="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
        </div>
      </main>
    </>
  );
} 