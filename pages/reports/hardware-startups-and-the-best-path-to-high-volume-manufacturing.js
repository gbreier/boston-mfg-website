import Head from 'next/head';
import Link from 'next/link';

export default function HardwareStartups() {
  return (
    <>
      <Head>
        <title>Hardware startups and the best path to high-volume manufacturing | Boston Manufacturing Group</title>
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <div className="flex justify-center pt-10 pb-4 bg-background">
          <Link href="/reports">
            <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>
        <section className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-secondary mb-4">Hardware startups and the best path to high-volume manufacturing</h1>
          <div className="flex items-center gap-3 mb-2">
            <img src="/ron-rubin.png" alt="Ron Rubin portrait" className="w-8 h-8 rounded-full object-cover border-2 border-secondary" />
            <p className="text-accent">Ron Rubin PhD, Managing Director, BMG &middot; Jan 29, 2021</p>
          </div>
          <article className="prose prose-blue max-w-none">
            <p>“Great Product - Everyone will want it in their homes!”</p>
            <p><strong>So, you designed a product that everyone is excited about.</strong> Prototypes were built; focus groups were held; hours upon hours of testing were conducted. <strong>The Verdict? Prospective customers love it!</strong></p>
            <p><strong>What's next?</strong> How do you build tens of thousands of it? How do you satisfy every customer, each of whom is expecting a high quality product? How much will it cost, or, more likely, how many can you make given the cash you have available? Do you know what dates the product will be available to your customers and what should be the desired quantity?</p>
            <p>The talent that works in the early phases to develop prototypes and design the product is not necessarily the talent that's needed to bring it to mass production and release it to the world.</p>
            <p>How do you ensure consistent production with high quality products (process control) while keeping the cost reasonable?</p>
            <h3>Hardware startups and the best path to high-volume manufacturing</h3>
            <p>Startup companies have <em>two</em> options once they have a vetted products ready for manufacturing and production. They can choose to manufacture in-house or to outsource the work through a contract manufacturer (CM). The right path to high-volume production depends on the financial and employee resources startups have available.</p>
            <h3>Option 1: Manufacture in-house</h3>
            <p>An internal manufacturing process is a more challenging and less common option for startups. It requires investment in skilled workers, real estate, equipment, systems and technology. These sorts of capital investments can be costly and cumbersome.</p>
            <p>However, there is an advantage to internal manufacturing operations. The transfer of knowledge and close cooperation between engineering and operation teams can improve product quality and streamline communication to address any requirements or issues.</p>
            <h3>Option 2: Hire a contract manufacturer</h3>
            <p>Most hardware startups will ultimately employ a contract manufacturer (CM) to provide all the production and manufacturing services. The CM, working closely with the customer, typically plans out a full-service manufacturing process which includes assembly, sourcing and supply chain management, quality control and possible design adjustments. The CM is also responsible for most of the New Product Introduction (NPI) process and can provide additional services such as distribution and reverse logistics resources. Some CMs can incorporate vertical integration for manufacturing of components and subsystems.</p>
            <p><strong>Fast moving and lack of procedures</strong></p>
            <p>One of the benefits, and drawbacks, of a startup company remains the lack of formalized Standard Operating Procedures (SOPs) . Changes can occur without the extra steps and long approval processes mandatory in a well-established organization. While wrong decisions can impact product quality, performance and logistics, startup companies must be able to pivot quickly to changing market conditions, and this should be reflected in the manufacturing process. Without having to weed through intracompany regulations, startups can quickly respond to customer requirements and requests. Company leadership can also implement engineering or design changes in a fraction of the time compared to established companies. As such, it is crucial that manufacturers (whether in house or via a Contract Manufacturer) design their Engineering Change Order (ECO) processes to be nimble and fast, and be able to address field quality failures rapidly, using, as an example, an expedited Root Cause Corrective <em>Action (RCCA)</em>.</p>
            <p><strong>Focus on core company competency</strong></p>
            <p>Hardware startups can more readily focus on what is identified as their core innovative ideas and develop it, while outsourcing more tedious and time-consuming components of the manufacturing process. In contrast, larger companies with in-house manufacturing tend to use internal resources and processes which may need to be significantly adjusted for each product. Using a Contract Manufacturer that is the best fit for (i) a small to medium size company and (ii) the product being developed is crucial to the success of bringing the product to market. The decision of which CM should be based on multiple factors, including experience, core-competency, size and quality.</p>
            <p><strong>Hardware is hard, but for different reasons</strong></p>
            <p>One of the main dangers for a new software product is competition from the heavy hitters. Every time Apple releases a new iOS upgrade, a couple of software companies go out of business. In China, Tencent, whose offerings include the instant messengers Tencent QQ and WeChat, is known to either absorb or drive out smaller competitive companies. This is less common for hardware companies. If a hardware product can get to the point that it is ready to sell on some small to medium scale, it is already way ahead of its competition. The process of getting a competitive prototype through mass production in order to sell is complex - and expensive - enough to often deter large organizations and small players from entering competitive markets. Building a manufacturing infrastructure and support specific to new hardware, developing a 'New Product Introduction' process, adjusting manufacturing capabilities, setting up production lines, driving best practices like Design For Manufacturing; these all take time and money. In fact, prototype development can be relatively fast for high volume hardware products, while the manufacturing process remains the barrier to entry that protects the producer of a first-to-market piece of hardware.</p>
            <blockquote className="text-2xl font-bold text-primary my-8">
              Says <a href="mailto:guy@boston-mfg.com" className="underline hover:text-secondary">Guy Breier</a>, founder and president of <a href="/" className="underline hover:text-secondary">Boston Manufacturing Group</a>, "For many small- to medium-size hardware companies, the dangers associated with the prototype-to-production phase is not related to competition, but rather, to self-inflicted wounds. To be sure, there are often regulatory and cost issues that must be understood and overcome, and burn rates that need to be carefully observed. The main barriers to success are the poor initial decisions made regarding the manufacturing process, due to a lack of experience with the specific manufacturing, quality control, and design-for-manufacturing issues for a new product. With a clear product focus, and proper investment in engineering and manufacturing capabilities, you will be way ahead of the curve."
            </blockquote>
            <h3>The ideal startup manufacturing process</h3>
            <p>Although prototype development is exciting, especially for hardware products, the process required to bring it from prototype to production is complex and fraught with enormous risks and its own interesting challenges. The best option for most companies is to make the correct investments of money, staff and technology to gain expertise, but also to carefully choose the right CM. If the company decides to manufacture in house, similar principles apply, and it is even more imperative to bring in expertise to advise on setting up an expensive and complex production line. In either case, a proper manufacturing process can position a hardware startup months and even years ahead of its competition.</p>
          </article>
        </section>
        <div className="flex justify-center pb-12">
          <a href="/" className="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
        </div>
      </main>
    </>
  );
} 