import { Check, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { DesignSystemSection } from "./DesignSystemSection"
import { StatusBadge } from "@/components/ui/status-badge"
import { BadgeDelta } from "@/components/ui/badge-delta"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const DataDisplaySection = () => {
  return (
    <DesignSystemSection
      title="Data Display"
      description="Components for displaying data in various formats"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Status Badges</h3>
          <div className="flex flex-wrap gap-4">
            <StatusBadge
              status="success"
              leftIcon={Check}
              rightIcon={Clock}
              leftLabel="Completed"
              rightLabel="2 hours ago"
            />
            <StatusBadge
              status="error"
              leftIcon={Clock}
              rightIcon={Clock}
              leftLabel="Failed"
              rightLabel="1 min ago"
            />
            <StatusBadge
              status="default"
              leftIcon={Clock}
              rightIcon={Clock}
              leftLabel="Pending"
              rightLabel="Just now"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Delta Badges</h3>
          <div className="flex flex-wrap gap-4">
            <BadgeDelta
              deltaType="increase"
              value="+12.3%"
              variant="outline"
            />
            <BadgeDelta
              deltaType="decrease"
              value="-5.2%"
              variant="solid"
            />
            <BadgeDelta
              deltaType="neutral"
              value="0%"
              variant="solidOutline"
            />
            <BadgeDelta
              deltaType="increase"
              value="+8.1%"
              variant="complex"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Table</h3>
          <Table>
            <TableCaption>Recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Payment received</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <StatusBadge
                    status="success"
                    leftIcon={Check}
                    leftLabel="Completed"
                    rightLabel="2h ago"
                  />
                </TableCell>
                <TableCell>
                  <BadgeDelta
                    deltaType="increase"
                    value="+12.3%"
                    variant="outline"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Refund processed</TableCell>
                <TableCell>$50.00</TableCell>
                <TableCell>
                  <StatusBadge
                    status="error"
                    leftIcon={Clock}
                    leftLabel="Failed"
                    rightLabel="1m ago"
                  />
                </TableCell>
                <TableCell>
                  <BadgeDelta
                    deltaType="decrease"
                    value="-5.2%"
                    variant="outline"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </DesignSystemSection>
  )
}