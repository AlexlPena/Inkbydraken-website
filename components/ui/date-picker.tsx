"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  disablePastDates?: boolean
}

export function DatePicker({ date, setDate, className, disabled, disablePastDates = true }: DatePickerProps) {
  // Get today's date at midnight for comparison
  const today = React.useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-gold/50 bg-black hover:bg-gold/10 hover:text-gold",
            !date && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-black border-gold/50" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disablePastDates ? (date) => date < today : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
