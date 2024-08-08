import { Popcorn } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { NavLinksProps } from "./types";
import Link from 'next/link';

interface SheetComponentProps extends NavLinksProps {
    sheetTitle: string;
    sheetDescription: string;
}

export function SheetComponent({ orientation, links, className, sheetTitle, sheetDescription }: SheetComponentProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Popcorn className="block sm:hidden" />
            </SheetTrigger>
            <SheetContent className={className}>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>
                <nav className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} justify-center items-center`}>
                    {links.map((link, index) => (
                        <Link key={index} href={link.path}>{link.name}</Link>
                    ))}
                </nav>
                {/* Uncomment and use these sections if needed */}
                {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div> */}
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    );
}
