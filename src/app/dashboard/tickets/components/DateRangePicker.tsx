"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
    value: string; // yyyy-mm-dd or yyyy-mm-dd,yyyy-mm-dd
    onChange: (val: string) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const parsedDate = React.useMemo(() => {
     if (!value) return undefined;
     const parts = value.split(',');
     let from: Date | undefined = undefined;
     let to: Date | undefined = undefined;
     if (parts[0]) {
         const d = new Date(parts[0]);
         d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
         from = d;
     }
     if (parts[1]) {
         const d = new Date(parts[1]);
         d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
         to = d;
     }
     return { from, to };
  }, [value]);

  const [date, setDate] = React.useState<DateRange | undefined>(parsedDate)

  // Sync state if value changes externally (eg. Clear filters)
  React.useEffect(() => {
      setDate(parsedDate);
  }, [parsedDate]);

  return (
    <div className={cn("grid gap-2 w-full")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal bg-slate-50/50 py-2.5 h-auto text-sm border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500",
              !date && "text-slate-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: es })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: es })
              )
            ) : (
              <span>Selecciona un rango</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
               setDate(newDate);
               if (!newDate?.from && !newDate?.to) {
                   onChange('');
                   return;
               }
               const f = newDate.from ? format(newDate.from, 'yyyy-MM-dd') : '';
               const t = newDate.to ? format(newDate.to, 'yyyy-MM-dd') : '';
               
               if (f && t) onChange(`${f},${t}`);
               else if (f && !t) onChange(f);
               else if (!f && t) onChange(t);
            }}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
