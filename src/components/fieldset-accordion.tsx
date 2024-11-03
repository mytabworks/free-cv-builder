import { Button } from "@/components/ui/button"
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDown } from "lucide-react"

interface FieldsetAccordionProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function FieldsetAccordion({title, className, children, ...props}: FieldsetAccordionProps) {

  return (
    
				<fieldset {...props} className={classNames("space-y-2 mb-6 bg-white border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500 p-4 rounded-md", null, className)}>
					<Accordion.Root type="single" defaultValue="default" collapsible className="w-full">
						<Accordion.Item value="default" className="w-full">
							<Accordion.Trigger className="flex justify-between items-center group/accordion w-full hover:no-underline">
								<h2 className="text-xl text-left">{title}</h2>
								<Button
									as="a"
									type="button"
									variant="secondary"
									size="sm"
									className="ml-2"
								>
									<ChevronDown className="group-[[data-state='open']]/accordion:rotate-180 h-4 w-4" />
								</Button>
							</Accordion.Trigger>
              <Accordion.Content className="pt-3">
                {children}
              </Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</fieldset>
  )
}