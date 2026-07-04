import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock, Cpu, Database, Layers3, X } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

const devices = [
  { name: 'AgileX PIPER', typeKey: 'Desktop Arm', image: 'piper.png', status: 'verified' as const, specs: ['6-DoF', 'ROS2', 'ReKep/SAM3'] },
  { name: 'Dobot Nova 2', typeKey: 'Desktop Arm', image: 'dobot.png', status: 'verified' as const, specs: ['4-DoF', 'Collaborative', 'ReKep'] },
  { name: 'Unitree Go2', typeKey: 'Quadruped', image: 'go2.png', status: 'verified' as const, specs: ['12 Motors', 'LiDAR', 'Navigation'] },
  { name: 'Franka Research 3', typeKey: 'Industrial Arm', image: 'franka.png', status: 'verified' as const, specs: ['7-DoF', 'Torque Sensing', 'Industrial'] },
  { name: 'XLeRobot', typeKey: 'Dual Arm', image: 'XLeRobot.png', status: 'verified' as const, specs: ['Dual Arm', 'Bimanual', 'ROS2'] },
  { name: 'LIBERO / RoboCasa', typeKey: 'Simulation', image: 'scene.png', status: 'partial' as const, specs: ['MuJoCo', 'Benchmark', 'Batch Eval'] },
];

const filterKeys = ['All', 'Arm', 'Quadruped', 'Simulation'];

export default function Hardware() {
  const t = useT();
  const base = import.meta.env.BASE_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState(t.hardware.filters[0]);

  const statusConfig = {
    verified: {
      icon: Check,
      color: 'text-emerald-200',
      bgColor: 'bg-emerald-300/10',
      borderColor: 'border-emerald-300/25',
      label: t.hardware.statusVerified,
    },
    partial: {
      icon: Clock,
      color: 'text-amber-200',
      bgColor: 'bg-amber-300/10',
      borderColor: 'border-amber-300/25',
      label: t.hardware.statusInProgress,
    },
  };

  const devicesWithType = useMemo(
    () =>
      devices.map((device, idx) => ({
        ...device,
        type: t.hardware.items[idx].type,
        description: t.hardware.items[idx].description,
      })),
    [t.hardware.items]
  );

  const filterKey = filterKeys[t.hardware.filters.indexOf(filter)] || 'All';
  const filteredDevices =
    filterKey === 'All' ? devicesWithType : devicesWithType.filter((device) => device.typeKey.includes(filterKey));
  const activeDevice = filteredDevices[activeIndex] || filteredDevices[0];
  const status = statusConfig[activeDevice.status];
  const StatusIcon = status.icon;

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setActiveIndex(0);
  };

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % filteredDevices.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + filteredDevices.length) % filteredDevices.length);

  return (
    <section id="hardware" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-grid-dense opacity-[0.05]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              label={t.hardware.label}
              title={t.hardware.title}
              highlight={t.hardware.highlight}
              description="Through Target Adapters, PhyAgentOS spans debug, simulation, and real-robot targets, from desktop arms to quadrupeds to dual-arm systems."
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {t.hardware.filters.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(option)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    filter === option
                      ? 'border-brand-accent bg-brand-accent text-brand-text-on-accent shadow-glow-soft'
                      : 'border-brand-border bg-brand-bg-secondary/70 text-brand-text-tertiary hover:border-brand-accent/35 hover:text-brand-text'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)]">
              <div className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-bg-secondary/78 shadow-card">
                <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-brand-accent-light">
                    <Cpu className="h-4 w-4" />
                    Target Adapter
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono ${status.bgColor} ${status.borderColor} ${status.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </div>
                </div>

                <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_260px]">
                  <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-black/24 p-8 sm:p-10">
                    <div className="absolute inset-0 bg-grid opacity-[0.07]" />
                    <div className="absolute left-6 top-6 h-14 w-14 border-l border-t border-brand-accent/30" />
                    <div className="absolute bottom-6 right-6 h-14 w-14 border-b border-r border-brand-accent/30" />
                    <img
                      src={`${base}${activeDevice.image}`}
                      alt={activeDevice.name}
                      className="relative z-10 max-h-[330px] w-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  <div className="border-t border-brand-border bg-brand-bg/58 p-6 lg:border-l lg:border-t-0">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-text-tertiary">
                      {activeDevice.type}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-text">
                      {activeDevice.name}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-brand-text-secondary">
                      {activeDevice.description}
                    </p>

                    <div className="mt-7 grid gap-2">
                      {activeDevice.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center justify-between rounded-md border border-brand-border bg-brand-bg-secondary/80 px-3 py-2.5"
                        >
                          <span className="text-xs text-brand-text-tertiary">Capability</span>
                          <span className="text-sm font-medium text-brand-text">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-border px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-brand-text-tertiary">
                    <Database className="h-4 w-4 text-brand-accent" />
                    {filteredDevices.length} targets in current view
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-bg-secondary text-brand-text-secondary transition-all hover:border-brand-accent/35 hover:text-brand-text"
                      aria-label="Previous target"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-bg-secondary text-brand-text-secondary transition-all hover:border-brand-accent/35 hover:text-brand-text"
                      aria-label="Next target"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-brand-border bg-brand-bg-secondary/78 p-4 shadow-card">
                <div className="mb-4 flex items-center gap-2 px-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-text-tertiary">
                  <Layers3 className="h-4 w-4 text-brand-accent" />
                  Adapter Library
                </div>
                <div className="space-y-2">
                  {filteredDevices.map((device, index) => {
                    const deviceStatus = statusConfig[device.status];
                    const DeviceStatusIcon = deviceStatus.icon;
                    return (
                      <button
                        key={device.name}
                        onClick={() => setActiveIndex(index)}
                        className={`group flex w-full items-center gap-4 rounded-md border p-3 text-left transition-all duration-300 ${
                          index === activeIndex
                            ? 'border-brand-accent/45 bg-brand-accent/10 shadow-glow-soft'
                            : 'border-brand-border bg-brand-bg/58 hover:border-brand-accent/30 hover:bg-brand-text/[0.035]'
                        }`}
                      >
                        <img
                          src={`${base}${device.image}`}
                          alt=""
                          className="h-14 w-14 flex-shrink-0 rounded-md border border-brand-border bg-black/24 object-contain p-2"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-brand-text">{device.name}</p>
                          <p className="mt-1 text-xs text-brand-text-tertiary">{device.type}</p>
                        </div>
                        <DeviceStatusIcon className={`h-4 w-4 flex-shrink-0 ${deviceStatus.color}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-20">
              <div className="mb-8 grid gap-4 lg:grid-cols-[0.6fr_1fr] lg:items-end">
                <h3 className="font-display text-2xl font-bold text-brand-text sm:text-3xl">
                  {t.hardware.deviceTable.title}
                </h3>
                <p className="text-sm leading-7 text-brand-text-secondary lg:text-right">
                  {t.hardware.deviceTable.description}
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-brand-border bg-brand-bg-secondary/78 shadow-card">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-text/[0.035]">
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.vendor}</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.model}</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.type}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.real}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.sim}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.tested}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.hardware.deviceTable.rows.map((row, index) => (
                      <tr key={index} className="border-b border-brand-border last:border-b-0 hover:bg-brand-text/[0.025]">
                        <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">{row.vendor || '-'}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-brand-text">{row.model}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-brand-text-secondary">{row.type}</td>
                        <td className="px-4 py-3 text-center">
                          {row.real ? <Check className="mx-auto h-4 w-4 text-emerald-300" /> : <X className="mx-auto h-4 w-4 text-brand-text-muted" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.sim ? <Check className="mx-auto h-4 w-4 text-emerald-300" /> : <X className="mx-auto h-4 w-4 text-brand-text-muted" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.tested ? <Check className="mx-auto h-4 w-4 text-emerald-300" /> : <Clock className="mx-auto h-4 w-4 text-amber-200" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
