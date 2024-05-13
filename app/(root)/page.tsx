import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 bg-opacity-50 min-h-1/2"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-white">
              We bring the world to your event
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-bold text-white">
              Leverage your extensive experience and international network to
              navigate the complexities of global event management
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore!</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          See Event <br /> That You Really Like!
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
