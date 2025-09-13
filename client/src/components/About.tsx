import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Home, Clock } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Home, label: 'Properties Sold', value: '500+' },
    { icon: Users, label: 'Happy Clients', value: '450+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Clock, label: 'Average Days to Sale', value: '30' }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Badge variant="outline" className="mb-4">
              About Premier Real Estate
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-serif mb-6">
              Your Trusted Partner in Real Estate Excellence
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                With over 15 years of experience in the real estate industry, Premier Real Estate has built 
                a reputation for delivering exceptional service and outstanding results. We specialize in 
                luxury residential properties and pride ourselves on understanding our clients' unique needs.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our dedicated team combines market expertise with personalized service to ensure every 
                transaction is smooth and successful. Whether you're buying your first home or selling 
                a luxury property, we're here to guide you through every step of the process.
              </p>
              
              <p className="text-lg leading-relaxed">
                We believe that finding the perfect home is more than just a transaction—it's about 
                discovering where your story begins. Let us help you write your next chapter.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Our Mission</h3>
              <p className="text-muted-foreground italic">
                "To provide exceptional real estate services through integrity, expertise, and genuine care 
                for our clients' dreams and goals."
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover-elevate transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <stat.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2" data-testid={`stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Licensed & Insured</h4>
                  <p className="text-sm text-muted-foreground">Fully licensed real estate professionals with comprehensive insurance coverage</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Local Market Experts</h4>
                  <p className="text-sm text-muted-foreground">Deep knowledge of neighborhood trends, pricing, and market conditions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}