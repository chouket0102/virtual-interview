import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";


async function Home() {
  /*const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;
  */
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/image-1.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        
      </section>

      <section className="flex flex-col gap-6 mt-8">
  <h2>Take Interviews</h2>
  
  <div className="flex flex-wrap gap-6">
    <InterviewCard 
      interviewId="interview-123"
      userId="user-456"
      role="Frontend Developer"
      type="Technical"
      techstack={["React", "TypeScript", "CSS"]}
      createdAt={new Date().toISOString()}
    />
    
    <InterviewCard 
      interviewId="interview-124"
      userId="user-456"
      role="Product Manager"
      type="Behavioral"
      techstack={["Agile", "Product Strategy"]}
      createdAt={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()} // 7 days ago
    />
    
    <InterviewCard 
      interviewId="interview-125"
      userId="user-456"
      role="Full Stack Engineer"
      type="Question-by-Question"
      techstack={["React", "Node.js", "MongoDB"]}
      createdAt={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()} // 3 days ago
    />
  </div>
</section>
    </>
  );
}

export default Home;