import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link href="/login">
        <Button>
          Login <ArrowRight className="ml-2" />
        </Button>
      </Link>
      <Link href="/register" className="mt-4">
        <Button variant="secondary" className="border">
          Register <ArrowRight className="ml-2" />
        </Button>
      </Link>
    </main>
  );
}
